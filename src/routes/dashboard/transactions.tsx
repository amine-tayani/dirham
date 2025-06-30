import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/transactions")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-semibold">Transactions</h1>
			<TransactionsTable />
		</div>
	);
}
