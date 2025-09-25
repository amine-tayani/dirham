import { transactionFormSchema, transactions } from "@/lib/db/schema";
import { AuthMiddleware } from "@/utils/authMiddleware";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";

// We need to use drizzle inside our handler to persist the data
// we need to use tanstack query more often

export const createTransactionFn = createServerFn({ method: "POST" })
	.validator(transactionFormSchema.parse)
	.middleware([AuthMiddleware])
	.handler(async ({ data, context }) => {
		const { activity, amount, date, status, currency } = data;
		if (!context.userId) {
			throw redirect({ to: "/login" });
		}

		try {
			await db.insert(transactions).values({
				activity,
				amount,
				date,
				status,
				currency,
				userId: context.userId
			});

			return { message: "Transaction created successfully" };
		} catch (error) {
			console.log(error);

			return { error: "Failed to save transaction" };
		}
	});
