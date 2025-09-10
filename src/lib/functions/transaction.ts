import { transactionFormSchema } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";

export const createTransactionFn = createServerFn({ method: "POST" })
	.validator(transactionFormSchema.parse)
	.handler(async ({ data }) => {
		console.log(data);
		return data;
	});
