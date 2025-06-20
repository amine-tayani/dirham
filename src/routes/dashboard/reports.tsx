import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/reports")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-xl font-bold">Reports</h1>
		</div>
	);
}
