import { Button } from "@/components/ui/button";
import { chatWithAi } from "@/lib/server/chat";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

type Message = {
	role: "user" | "assistant";
	content: string;
};

export function AiAssistant() {
	const [prompt, setPrompt] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);

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

		const userMessage: Message = { role: "user", content: prompt };
		setMessages((prev) => [...prev, userMessage]);
		setPrompt("");
		setIsGenerating(true);

		setNewTimeout(() => {
			setIsGenerating(false);
		}, 2000);

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

	return (
		<div className="flex flex-col h-[540px] w-full">
			<div className="flex-1 overflow-y-auto px-4">
				<div className="max-w-5xl mx-auto space-y-6 py-4">
					{messages.map((message, index) => (
						<div
							key={index}
							className={cn(
								"flex items-start gap-4",
								message.role === "user" ? "justify-end" : "justify-start"
							)}
						>
							<div
								className={cn(
									"rounded-full px-4 py-1.5 max-w-[85%]",
									message.role === "user"
										? "bg-muted border border-border"
										: "bg-muted/30 border border-muted-foreground/10"
								)}
							>
								<p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			</div>
			<div className="w-full px-4 mb-3 mt-7">
				<form onSubmit={handleSubmit}>
					<div className="relative max-w-5xl mx-auto">
						<div className="relative flex items-center">
							<textarea
								id="prompt"
								className="w-full resize-none rounded-xl border border-border bg-background/80 py-8 px-5 pr-20 text-lg ring-offset-background transition-colors placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[90px] max-h-[300px]"
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								onKeyDown={handleKeyDown}
								rows={1}
								placeholder="Ask anything..."
							/>
							<div className="absolute right-2 bottom-[20px] z-20 flex gap-2">
								{isGenerating && stop ? (
									<Button
										type="button"
										size="icon"
										variant="outline"
										className="h-10 w-10 rounded-xl hover:bg-muted/50"
										aria-label="Stop generating"
										onClick={stop}
									>
										<SquareIcon className="h-4 w-4 animate-pulse" fill="currentColor" />
									</Button>
								) : (
									<Button
										type="submit"
										size="icon"
										variant="outline"
										className="h-10 w-10 rounded-xl hover:bg-muted/50 transition-colors"
										aria-label="Send message"
										disabled={!prompt.trim() || isGenerating}
									>
										<ArrowUpIcon className="h-5 w-5" />
									</Button>
								)}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
