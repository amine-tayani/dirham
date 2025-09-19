import { Chart } from "@/components/blocks/chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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
								"bg-white dark:bg-neutral-950/70",
								"bg-linear-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900/90 dark:to-neutral-900/60",
								"backdrop-blur-xl backdrop-saturate-[180%]",
								"border-none dark:border dark:border-white/10",
								"shadow-[0_8px_16px_rgb(0_0_0_/_0.15)] dark:shadow-[0_8px_16px_rgb(0_0_0_/_0.25)]"
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
									<Badge variant={stat.positive ? "success" : "destructive"}>
										{stat.delta > 0 ? (
											<ArrowUpIcon className="size-3.5" />
										) : (
											<ArrowDownIcon className="size-3.5" />
										)}
										{stat.delta}%
									</Badge>
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
