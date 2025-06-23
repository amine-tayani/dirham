import { StatsCard } from "@/components/dashboard/stats-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/transactions")({
	component: RouteComponent
});

export const statsData = [
	{
		title: "Budget",
		value: "$20,250",
		changePercent: "+4.6%"
	},

	{
		title: "Expenditure",
		value: "$14,250",
		changePercent: "-4%"
	},
	{
		title: "Income",
		value: "$17,650",
		changePercent: "+4.3%"
	}
];

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-xl font-semibold">Overview</h1>
			<StatsCard />
		</div>
	);
}
