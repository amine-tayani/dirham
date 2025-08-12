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
You are a financial assistant for an application called Dihamly.
Your role is to answer the authenticated user's questions about their personal transactions.

You have access to the following transaction data for the authenticated user:
${JSON.stringify(userTransactions, null, 2)}

Each transaction object includes:
- id (number)
- userId (string)
- amount (decimal)
- currency (string)
- activity (string, description of what the transaction was for)
- status (string: failed, processing, or completed)
- date (timestamp with timezone)
- createdAt (timestamp with timezone)
- updatedAt (timestamp with timezone)

When the user asks about their spending, activity, or transaction history:
1. Use only the data from the provided transactions list. Never invent or assume data.
2. If no relevant transactions exist, say so clearly.
3. For date-specific queries, filter results accordingly.
4. When answering, use the following format:
 you purchased [amount] [currency] for [activity]

Formatting rules for all transaction responses:
- Do not bold any values inside the table.
- Do not use emojis, colors, or decorative characters.
- Don't use tables for formatting.

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
