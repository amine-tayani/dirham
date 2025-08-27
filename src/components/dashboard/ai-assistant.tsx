import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { chatWithAi } from "@/lib/chat";
import { cn } from "@/lib/utils";
import type { User } from "better-auth";
import { ArrowUpIcon, SquareIcon, StarsIcon } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

interface AiAssistantProps {
	user: User;
}

type Message = {
	role: "user" | "assistant";
	content: string;
};

export function AiAssistant({ user }: AiAssistantProps) {
	const [prompt, setPrompt] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [hasMessages, setHasMessages] = useState(false);
	const timeout = useRef<number | null>(0);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const cancelTimeout = () => {
		if (timeout.current) {
			window.clearTimeout(timeout.current);
		}
	};

	const setNewTimeout = (callback: () => void, ms: number) => {
		cancelTimeout();
		const id = window.setTimeout(callback, ms);
		timeout.current = id;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!prompt.trim()) return;

		if (!hasMessages) {
			setHasMessages(true);
		}

		const userMessage: Message = { role: "user", content: prompt };
		setMessages((prev) => [...prev, userMessage]);
		setPrompt("");
		setIsGenerating(true);

		setNewTimeout(() => {
			setIsGenerating(false);
		}, 3000);

		try {
			const response = await chatWithAi({ data: prompt });
			const assistantMessage: Message = {
				role: "assistant",
				content: response.choices[0].message.content
			};
			setMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Failed to get AI response:", error);
		} finally {
			setIsGenerating(false);
			scrollToBottom();
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (prompt.trim() && !isGenerating) {
				handleSubmit(e as any);
			}
		}
	};

	const stop = () => {
		setIsGenerating(false);
		cancelTimeout();
	};

	return (
		<div className="flex flex-col h-[570px] w-full bg-background">
			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto">
				{hasMessages ? (
					<div className="w-full">
						{messages.map((message, index) => (
							<div key={index} className={cn("w-full py-3")}>
								<div className="max-w-4xl mx-auto px-6">
									<div className="flex gap-3">
										{/* Avatar */}
										<div className="flex-shrink-0 mt-1">
											{message.role === "user" && (
												<Avatar className="size-8">
													<AvatarImage src={user.image || ""} alt="Avatar" />
													<AvatarFallback className="text-neutral-600">
														{user.name.slice(0, 2).toUpperCase()}
													</AvatarFallback>
												</Avatar>
											)}
										</div>

										{/* Message Content */}
										<div className="flex items-center min-w-0">
											<div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
												<p className="whitespace-pre-wrap text-[15px] leading-7">
													{message.content}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}

						{/* Loading indicator */}
						{isGenerating && (
							<div className="w-full py-6">
								<div className="max-w-4xl mx-auto px-6">
									<div className="flex gap-1">
										<div className="size-2 bg-current rounded-full animate-pulse" />
										<div className="size-2 bg-current rounded-full animate-pulse delay-100" />
										<div className="size-2 bg-current rounded-full animate-pulse delay-200" />
									</div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>
				) : (
					/* Empty State */
					<div className="flex-1 flex items-center justify-center px-6">
						<div className="text-center max-w-md">
							<div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<StarsIcon className="size-8 text-primary" />
							</div>
							<h2 className="text-2xl font-semibold text-muted-foreground dark:text-white mb-2">
								Hi <span className="capitalize">{user.name}</span>, how can I help you?
							</h2>
						</div>
					</div>
				)}
			</div>

			<div className="flex-shrink-0 border-t border-border/40 bg-background">
				<div className="max-w-4xl mx-auto p-6">
					<form onSubmit={handleSubmit} className="w-full">
						<div className="relative flex items-end gap-2 bg-background border border-border/60 rounded-2xl shadow-sm focus-within:shadow-md transition-all duration-200 focus-within:border-border">
							<textarea
								id="prompt"
								className="flex-1 resize-none bg-transparent px-4 py-3 text-[16px] leading-6 placeholder:text-muted-foreground/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 max-h-[200px] min-h-[24px]"
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								onKeyDown={handleKeyDown}
								rows={1}
								placeholder="Type your prompt here..."
								style={{
									height: "auto",
									minHeight: "24px"
								}}
								onInput={(e) => {
									const target = e.target as HTMLTextAreaElement;
									target.style.height = "auto";
									target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
								}}
							/>

							<div className="flex-shrink-0 p-2">
								{isGenerating ? (
									<Button
										type="button"
										size="icon"
										variant="ghost"
										className="size-8 rounded-lg hover:bg-muted"
										aria-label="Stop generating"
										onClick={stop}
									>
										<SquareIcon className="size-4" />
									</Button>
								) : (
									<Button
										type="submit"
										size="icon"
										className={cn(
											"size-8 rounded-lg transition-all duration-200",
											prompt.trim() && !isGenerating
												? "bg-foreground text-background hover:bg-foreground/90"
												: "bg-muted text-muted-foreground cursor-not-allowed"
										)}
										aria-label="Send message"
										disabled={!prompt.trim() || isGenerating}
									>
										<ArrowUpIcon className="size-4" />
									</Button>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
