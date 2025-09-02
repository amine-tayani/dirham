import { InsightCard } from "@/components/dashboard/insight-card";
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
	const data = [
		{
			title: "Total Transactions",
			value: "5"
		},
		{
			title: "Income",
			value: "$1583.54",
			changePercent: "+3.5%"
		},
		{
			title: "Expenses",
			value: "$683.54",
			changePercent: "+7.5%"
		}
	];
	return (
		<div className="flex h-full">
			<main className="flex-1 flex flex-col h-screen overflow-hidden">
				<div className="flex-1 overflow-y-auto flex flex-col gap-4 mx-7 mb-4">
					<div className="grid grid-cols-2 min-[1200px]:grid-cols-4 gap-4 mt-2 mb-4">
						{data.map((item) => (
							<InsightCard
								key={item.title}
								title={item.title}
								value={item.value}
								changePercent={item.changePercent}
							/>
						))}
					</div>
					<TransactionsTable data={transactions} />
				</div>
			</main>
		</div>
	);
}
