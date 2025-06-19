import { createFileRoute } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div>
			<div className="flex items-center justify-center gap-2 py-10 px-4 sm:px-6 lg:px-8">
				<SettingsIcon className="size-6" />
				<h1 className="text-xl font-bold">Settings</h1>
			</div>
		</div>
	);
}
