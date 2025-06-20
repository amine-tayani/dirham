import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/spending")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-xl font-bold">Spending</h1>
		</div>
	);
}
