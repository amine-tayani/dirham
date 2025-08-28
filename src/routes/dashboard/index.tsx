import { InteractiveChart } from "@/components/interactive-chart";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardPage,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function DashboardPage() {
	return (
		<div className="flex flex-1 flex-col gap-4 lg:gap-6 mt-4 mx-7 mb-4">
			<div className="h-screen min-h-[570px] flex-1">
				<InteractiveChart />

				{/* here we can add net worth chart and other metrics when user link their bank accounts */}
				{/* net worth chart */}
				{/* end of net worth chart */}
			</div>
		</div>
	);
}
