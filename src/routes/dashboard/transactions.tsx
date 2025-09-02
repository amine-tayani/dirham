import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
			value: 4
		},
		{
			title: "Income",
			value: 583.54
		},
		{
			title: "Expenses",
			value: 683.54
		}
	];
	return (
		<div className="flex h-full">
			<main className="flex-1 flex flex-col h-screen overflow-hidden">
				<div className="flex-1 overflow-y-auto flex flex-col gap-4 mx-7 mb-4">
					<div className="grid grid-cols-1 min-[1200px]:grid-cols-5 gap-4 mt-2 mb-4">
						{data.map((item) => (
							<Card className="flex flex-col border-border shadow-none" key={item.title}>
								<CardHeader className="relative">
									<CardDescription className="text-sm font-medium -mt-2">
										<span>{item.title}</span>
									</CardDescription>
									<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums mt-2">
										{Number.isInteger(item.value)
											? item.value
											: new Intl.NumberFormat("en-US", {
													style: "currency",
													currency: "USD",
													currencyDisplay: "narrowSymbol"
												}).format(item.value)}
									</CardTitle>
								</CardHeader>
							</Card>
						))}
					</div>
					<TransactionsTable data={transactions} />
				</div>
			</main>
		</div>
	);
}
