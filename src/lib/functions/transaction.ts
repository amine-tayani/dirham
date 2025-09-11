import { transactionFormSchema } from "@/lib/db/schema";
import { AuthMiddleware } from "@/utils/authMiddleware";
import { createServerFn } from "@tanstack/react-start";

// We need to use drizzle inside our handler to persist the data
// we need to use tanstack query more often

export const createTransactionFn = createServerFn({ method: "POST" })
	.validator(transactionFormSchema.parse)
	.middleware([AuthMiddleware])
	.handler(async ({ data, context }) => {
		console.log(context);
		return data;
	});
