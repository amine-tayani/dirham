import { transactionFormSchema, transactions } from "@/lib/db/schema";
import { AuthMiddleware } from "@/utils/authMiddleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import * as z from "zod";
import { db } from "../db";
import { recognizeTextFromImage } from "../text";

// We need to use drizzle inside our handler to persist the data
// we need to use tanstack query more often

export const createTransactionFn = createServerFn({ method: "POST" })
	.validator(transactionFormSchema.parse)
	.middleware([AuthMiddleware])
	.handler(async ({ data, context: { userId } }) => {
		const { activity, amount, date, status, currency } = data;

		try {
			await db.insert(transactions).values({
				activity,
				amount,
				date,
				status,
				currency,
				userId
			});

			return { message: "Transaction created successfully" };
		} catch (error) {
			console.log(error);

			return { error: "Failed to save transaction" };
		}
	});

export const deleteTransactionFn = createServerFn({ method: "POST" })
	.validator(
		z.object({
			id: z.number()
		})
	)
	.middleware([AuthMiddleware])
	.handler(async ({ data, context: { userId } }) => {
		const [row] = await db
			.select()
			.from(transactions)
			.where(and(eq(transactions.userId, userId), eq(transactions.id, data.id)));

		if (!row) {
			return { error: "Transaction not found" };
		}

		await db.delete(transactions).where(eq(transactions.id, data.id));

		return { message: "Transaction deleted successfully" };
	});

export const uploadFileSchema = z.object({
	file: z
		.instanceof(File)
		.refine(
			(file) => {
				console.log(file);
				return file.size <= 5 * 1024 * 1024;
			},
			{
				message: "File size should be less than 5MB"
			}
		)
		.refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
			message: "File type should be JPEG or PNG."
		})
});

export type UploadFileSchema = z.infer<typeof uploadFileSchema>;

export const parseReceiptFn = createServerFn({ method: "POST" })
	.middleware([AuthMiddleware])
	.validator((formData: FormData) => {
		if (!(formData instanceof FormData)) {
			throw new Error("Invalid form data");
		}
		const file = formData.get("file");

		const valid = uploadFileSchema.safeParse({ file });
		if (!valid.success) {
			throw new Error(valid.error.message);
		}

		return valid.data;
	})
	.handler(async ({ data }) => {
		const file = data.file;
		if (!file) return { error: "No file uploaded" };

		const buffer = await file.arrayBuffer();
		const uint8Array = new Uint8Array(buffer);

		// Extract text
		let content = "";
		if (file.type.startsWith("image/")) {
			const text = await recognizeTextFromImage(file);
			content = text;
		}

		// Send text to AI parser
		const transactions = await extractTransactionsFromText(content);
		return { transactions };
	});

async function extractTransactionsFromText(text: string) {
	const prompt = `
Extract all purchase transactions from the text.
Return only valid JSON (no code fences or markdown).
Format like:
[
  { "activity": "Supermarket XYZ", "amount": 123.45, "currency": "MAD", "date": "2025-10-01" }
]

Text:
${text}
`;

	const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "openai/gpt-oss-20b:free",
			messages: [{ role: "user", content: prompt }]
		})
	});

	const data = await res.json();

	let output = data.choices?.[0]?.message?.content?.trim() || "[]";

	// 🧹 Remove markdown code fences and non-JSON garbage
	output = output.replace(/```json|```/g, "").trim();

	try {
		return JSON.parse(output);
	} catch (err) {
		console.error("❌ Failed to parse AI JSON:", output);
		return [];
	}
}
