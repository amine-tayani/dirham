import { Button } from "@/components/ui/button";
import { chatWithAi } from "@/lib/server/chat";
import { useState } from "react";

type AiAssistantProps = { prompt: string };

export function AiAssistant() {
	const [prompt, setPrompt] = useState<string>("");
	const [response, setResponse] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await chatWithAi({ data: prompt });

		// console.log(response);
		setResponse(response.choices[0].message.content);
	};

	return (
		<div>
			<h1>AI Assistant</h1>

			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<form onSubmit={handleSubmit}>
						<div className="w-full">
							<label htmlFor="prompt" className="text-sm font-medium">
								Prompt
							</label>
							<textarea
								id="prompt"
								className="w-full rounded-md border border-border bg-transparent py-2 px-3 text-sm shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
							/>
						</div>
						<Button
							type="submit"
							className="flex items-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted active:bg-accent disabled:bg-accent/40 disabled:text-muted-foreground"
						>
							Submit
						</Button>
					</form>
				</div>
				<div className="flex flex-col gap-2">
					<div className="text-sm font-medium">Response</div>
					<div className="overflow-auto max-h-[300px]">
						<pre className="whitespace-pre-wrap break-all">{response}</pre>
					</div>
				</div>
			</div>
		</div>
	);
}
