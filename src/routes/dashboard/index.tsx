import { InsightCard } from "@/components/dashboard/insight-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

const data = [
	{
		title: "Total Balance",
		value: "$1234.56",
		changePercent: "-4.6%"
	},
	{
		title: "Monthly Income",
		value: "$583.54",
		changePercent: "-4%"
	},
	{
		title: "Monthly Expenses",
		value: "$1,000",
		changePercent: "+10%"
	},
	{
		title: "Savings",
		value: "$800.32",
		changePercent: "-2.5%"
	}
];

function RouteComponent() {
	return (
		<div className="flex flex-1 flex-col gap-4 lg:gap-6 mt-4 mx-7 mb-4">
			<div className="grid grid-cols-2 min-[1200px]:grid-cols-4 gap-4">
				{data.map((item) => (
					<InsightCard
						key={item.title}
						title={item.title}
						value={item.value}
						changePercent={item.changePercent}
					/>
				))}
			</div>
			<div className="min-h-[100vh] flex-1 md:min-h-min">
				<InteractiveChart />
			</div>
		</div>
	);
}
