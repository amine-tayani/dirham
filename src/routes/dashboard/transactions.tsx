import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/transactions")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-xl font-bold">Transactions</h1>
		</div>
	);
}
