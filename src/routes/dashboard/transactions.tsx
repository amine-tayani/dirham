import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { UserNav } from "@/components/user-nav";
import { db } from "@/lib/db";
import { transactions } from "@/lib/db/schema";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getTransactions = createServerFn().handler(async () => {
	const data = await db.select().from(transactions);
	return data;
});

export const Route = createFileRoute("/dashboard/transactions")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		return { ...context, title: "Transactions" };
	},
	loader: async () => {
		return {
			transactions: await getTransactions()
		};
	}
});

function RouteComponent() {
	const { queryClient, user } = Route.useRouteContext();
	const { transactions } = Route.useLoaderData();

	return (
		<div className="flex h-full">
			<main className="flex-1 flex flex-col h-screen overflow-hidden">
				<header className="flex h-20 shrink-0 items-center gap-2 border-b pt-2 mb-4 bg-background z-20">
					<div className="flex flex-1 items-center gap-2">
						<div className="flex items-center justify-between gap-4 pl-7">
							<h1 className="text-2xl font-medium tracking-tight">Transactions</h1>
						</div>
					</div>
					<div className="flex ml-auto pr-7">
						{user && <UserNav user={user} queryClient={queryClient} />}
					</div>
				</header>
				<div className="flex-1 overflow-y-auto flex flex-col gap-4 mx-7 mb-4">
					<TransactionsTable data={transactions} />
				</div>
			</main>
		</div>
	);
}
