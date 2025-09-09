import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from "@/components/ui/chart";

import { compactNumberFormatter, shorterDateFormatter } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export const description = "An interactive area chart";

const chartData = [
	{ date: "2024-04-01", spend: 222, revenue: 150 },
	{ date: "2024-04-02", spend: 297, revenue: 180 },
	{ date: "2024-04-03", spend: 167, revenue: 120 },
	{ date: "2024-04-04", spend: 242, revenue: 260 },
	{ date: "2024-04-05", spend: 373, revenue: 290 },
	{ date: "2024-04-06", spend: 301, revenue: 340 },
	{ date: "2024-04-07", spend: 245, revenue: 180 },
	{ date: "2024-04-08", spend: 209, revenue: 320 },
	{ date: "2024-04-09", spend: 259, revenue: 110 },
	{ date: "2024-04-10", spend: 2161, revenue: 190 },
	{ date: "2024-04-11", spend: 1227, revenue: 350 },
	{ date: "2024-04-12", spend: 292, revenue: 1210 },
	{ date: "2024-04-13", spend: 342, revenue: 380 },
	{ date: "2024-04-14", spend: 137, revenue: 220 },
	{ date: "2024-04-15", spend: 120, revenue: 170 },
	{ date: "2024-04-16", spend: 138, revenue: 1190 },
	{ date: "2024-04-17", spend: 446, revenue: 360 },
	{ date: "2024-04-18", spend: 364, revenue: 410 },
	{ date: "2024-04-19", spend: 243, revenue: 180 },
	{ date: "2024-04-20", spend: 89, revenue: 1150 },
	{ date: "2024-04-21", spend: 137, revenue: 200 },
	{ date: "2024-04-22", spend: 224, revenue: 170 },
	{ date: "2024-04-23", spend: 138, revenue: 230 },
	{ date: "2024-04-24", spend: 387, revenue: 290 },
	{ date: "2024-04-25", spend: 215, revenue: 250 },
	{ date: "2024-04-26", spend: 75, revenue: 130 },
	{ date: "2024-04-27", spend: 383, revenue: 420 },
	{ date: "2024-04-28", spend: 122, revenue: 180 },
	{ date: "2024-04-29", spend: 315, revenue: 240 },
	{ date: "2024-04-30", spend: 454, revenue: 380 }
];

const chartConfig = {
	finances: {
		label: "Finances"
	},
	spend: {
		label: "Spend",
		color: "var(--chart-2)"
	},
	revenue: {
		label: "Revenue",
		color: "var(--chart-1)"
	}
} satisfies ChartConfig;

export function InteractiveChart() {
	return (
		<Card className="pt-0 border-border shadow-none">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardDescription className="text-xs">Spend Activity</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<Tabs defaultValue="1w">
						<TabsList className="flex gap-2 border border-border">
							<TabsTrigger value="1w">1W</TabsTrigger>
							<TabsTrigger value="1m">1M</TabsTrigger>
							<TabsTrigger value="6m">6M</TabsTrigger>
							<TabsTrigger value="1y">1Y</TabsTrigger>
						</TabsList>
					</Tabs>
					<div>
						<Button variant="outline" className="flex shadow-none items-center gap-2">
							<FilterIcon className="size-4 stroke-2" />
							<span>Filter</span>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:pr-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id="fillSpend" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--chart-6" stopOpacity={0.01} />
								<stop offset="95%" stopColor="var(--chart-6" stopOpacity={0.04} />
							</linearGradient>
							<linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.1} />
								<stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={70}
							tickFormatter={(v) => shorterDateFormatter(v)}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							tickCount={5}
							tickFormatter={compactNumberFormatter}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent labelFormatter={shorterDateFormatter} indicator="line" />
							}
						/>
						<Area
							dataKey="spend"
							type="natural"
							fill="url(#fillSpend)"
							stroke="var(--chart-6)"
							stackId="a"
						/>
						<Area
							dataKey="revenue"
							type="natural"
							fill="url(#fillRevenue)"
							stroke="var(--chart-5)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
