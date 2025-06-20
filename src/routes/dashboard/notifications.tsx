import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/notifications")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-xl font-bold">Notifications</h1>
		</div>
	);
}
