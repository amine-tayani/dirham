import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/reports")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div className="flex flex-1 flex-col gap-4 lg:gap-6 mx-7 mt-4 mb-7">
			This is the reports page
		</div>
	);
}
