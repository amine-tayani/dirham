import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const Prompt = z.string();

export const chatWithAi = createServerFn({
	method: "POST"
})
	.validator((prompt: string) => Prompt.parse(prompt))
	.handler(async (ctx) => {
		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
				"X-Title": "Dihamly", // Optional. Site title for rankings on openrouter.ai.
				"Content-Type": "application/json"
			},

			body: JSON.stringify({
				model: "openrouter/horizon-beta",
				messages: [
					{
						role: "user",
						content: ctx.data
					}
				]
			})
		});
		return response.json();
	});
