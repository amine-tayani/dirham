import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";
import { transactions } from "./schema";

export const Prompt = z.string();

export const chatWithAi = createServerFn({
	method: "POST"
})
	.validator((prompt: string) => Prompt.parse(prompt))
	.handler(async (ctx) => {
		const userTransactions = await db.select().from(transactions);

		const systemMessage = `
You are Dirhamly's AI financial assistant.
You have access to the user's real transaction data in JSON format.
Do not invent or guess data. Only answer based on this data.



Here is the user's transaction data:
${JSON.stringify(userTransactions, null, 2)}

Rules:
- Use the "amount" and "currency" for any spending calculations.
- Filter results based on "status" and "date" if asked.
- If no transactions match, say: "No matching transactions found."
- Always format amounts with two decimal places and include currency.
    `.trim();

		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
				"X-Title": "Dihamly", // Optional. Site title for rankings on openrouter.ai.
				"Content-Type": "application/json"
			},

			body: JSON.stringify({
				model: "openai/gpt-oss-20b:free",
				messages: [
					{ role: "system", content: systemMessage },
					{
						role: "user",
						content: ctx.data
					}
				]
			})
		});
		return response.json();
	});
