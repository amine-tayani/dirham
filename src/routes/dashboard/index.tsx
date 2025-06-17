import { StatsCard } from "@/components/dashboard/stats-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { greetUser } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardIndex,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function DashboardIndex() {
	const { queryClient } = Route.useRouteContext();
	const { user } = Route.useLoaderData();

	return (
		<div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-2xl font-medium font-mono tracking-tighter">
					{`${greetUser()} ${user.name}`}
				</h1>
			</div>
			<StatsCard />
			<div className="min-h-[100vh] flex-1 md:min-h-min">
				<InteractiveChart />
			</div>
		</div>
	);
}
