import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { db } from "@/lib/db";
import { transactions } from "@/lib/db/schema";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getTransactions = createServerFn().handler(async () => {
	const data = await db.select().from(transactions);
	return data;
});

export const Route = createFileRoute("/dashboard/transactions")({
	component: TransactionsPage,
	beforeLoad: async ({ context }) => {
		return { ...context, title: "Transactions" };
	},
	loader: async () => {
		return {
			transactions: await getTransactions()
		};
	}
});

function TransactionsPage() {
	const { transactions } = Route.useLoaderData();

	return (
		<div className="flex h-full">
			<main className="flex-1 flex flex-col h-screen overflow-hidden">
				<div className="flex-1 overflow-y-auto flex flex-col gap-4 mx-7 mb-4">
					<TransactionsTable data={transactions} />
				</div>
			</main>
		</div>
	);
}
