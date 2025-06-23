import { InsightCard } from "@/components/dashboard/insight-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/transactions")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-xl font-semibold">Overview</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<InsightCard title="Budget" value="$20,250" changePercent="+25.00%" />
				<InsightCard title="Expends" value="$14,350" changePercent="+8.75%" />
				<InsightCard title="Income" value="$17,550" changePercent="-24.50%" />
			</div>
		</div>
	);
}
