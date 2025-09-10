import { transactionFormSchema } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";

// we need to add an auth middleware here since we are adding a transaction
export const createTransactionFn = createServerFn({ method: "POST" })
	.validator(transactionFormSchema.parse)
	.handler(async ({ data, context }) => {
		console.log(context);
		return data;
	});
