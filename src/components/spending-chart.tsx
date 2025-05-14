import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from "@/components/ui/chart";
import dayjs from "dayjs";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
	spending: {
		label: "spending"
	}
} satisfies ChartConfig;

// this is just a mock data - we will replace it with real data
const generateRandomData = () => {
	const start = dayjs().startOf("month");
	const daysInMonth = dayjs().daysInMonth();

	return Array.from({ length: daysInMonth }, (_, i) => {
		const date = start.add(i, "day");
		return {
			day: date.format("MMM D"),
			spending: Math.floor(Math.random() * (500 - 100 + 1)) + 100
		};
	});
};

export function SpendingChart() {
	const startOfMonth = dayjs().startOf("month").format("MMM D, YYYY");
	const endOfMonth = dayjs().endOf("month").format("MMM D, YYYY");

	const chartData = React.useMemo(() => generateRandomData(), []);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-sm text-muted-foreground uppercase">Current Month</CardTitle>
				<CardDescription className="font-semibold text-lg dark:text-neutral-100 text-black">
					{startOfMonth} - {endOfMonth}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="h-48 w-full">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickMargin={7}
							tickLine={false}
							axisLine={false}
							interval={4}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey="spending" fill="var(--color-primary)" radius={2} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
