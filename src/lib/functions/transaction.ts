import { transactionFormSchema, transactions } from "@/lib/db/schema";
import { AuthMiddleware } from "@/utils/authMiddleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../db";

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
