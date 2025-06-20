import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/upcomings")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-xl font-bold">Upcomings</h1>
		</div>
	);
}
