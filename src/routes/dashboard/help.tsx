import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/help")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-xl font-bold">Help</h1>
		</div>
	);
}
