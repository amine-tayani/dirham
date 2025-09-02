import { InsightCard } from "@/components/dashboard/insight-card";
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
	return (
		<div className="flex flex-1 flex-col gap-4 lg:gap-6 mt-4 mx-7 mb-4">
			<div className="h-screen min-h-[570px] flex-1">
				{data.map((item) => (
					<InsightCard
						key={item.title}
						title={item.title}
						value={item.value}
						changePercent={item.changePercent}
					/>
				))}
				<InteractiveChart />
			</div>
		</div>
	);
}
