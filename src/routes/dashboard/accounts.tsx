import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/accounts")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-xl font-bold">Accounts</h1>
		</div>
	);
}
