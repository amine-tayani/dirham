import { Chart } from "@/components/blocks/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardPage,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function DashboardPage() {
	const stats = [
		{
			title: "Total Balance",
			value: 15678.45,
			lastMonth: 10592,
			delta: 4.6,
			positive: true,
			prefix: "$",
			suffix: ""
		},
		{
			title: "Monthly Income",
			value: 1250.75,
			lastMonth: 1400,
			delta: -2.5,
			positive: false,
			prefix: "$",
			suffix: ""
		},
		{
			title: "Monthly Expenses",
			value: 800.32,
			lastMonth: 1000,
			delta: 2.5,
			positive: true,
			prefix: "$",
			suffix: ""
		},
		{
			title: "Savings",
			value: 48200,
			lastMonth: 50480,
			delta: -2.5,
			positive: false,
			prefix: "$",
			suffix: ""
		}
	];
	return (
		<div className="flex flex-1 flex-col gap-4 lg:gap-6 mt-4 mx-7 mb-4">
			<div className="h-screen min-h-[570px] flex-1">
				<div className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
					{stats.map((stat, index) => (
						<Card
							key={index}
							className={cn(
								"bg-neutral-100 dark:bg-input/30",
								"dark:bg-gradient-to-b dark:from-muted dark:to-neutral-900",
								"dark:border-none dark:shadow-xl shadow-none"
							)}
						>
							<CardHeader className="border-0">
								<CardTitle className="text-muted-foreground text-sm font-medium">
									{stat.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-2.5 -mt-2">
									<span className="text-2xl font-medium text-foreground tracking-tight">
										{stat.prefix + stat.value + stat.suffix}
									</span>
									<span
										className={cn(
											"text-muted-foreground text-sm font-geist font-medium",
											stat.positive ? "text-[#098d50]" : "text-[#c83131]"
										)}
									>
										{stat.delta > 0 ? "+" : ""}
										{stat.delta}%
									</span>
								</div>
								<div className="text-xs text-muted-foreground mt-2 border-t pt-2.5">
									Vs last month:{" "}
									<span className="font-medium text-foreground">
										{stat.prefix + stat.lastMonth + stat.suffix}
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<Chart />
			</div>
		</div>
	);
}
