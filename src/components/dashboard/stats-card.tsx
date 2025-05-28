import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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

export function StatsCard() {
	return (
		<div className="grid grid-cols-2 min-[1200px]:grid-cols-4 gap-4">
			{data.map((item) => (
				<Card
					key={item.title}
					className="flex flex-col border border-neutral-200 shadow-none dark:border-neutral-800"
				>
					<CardHeader className="relative">
						<CardDescription className="text-sm font-medium">
							<span>{item.title}</span>
						</CardDescription>
						<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums mt-5">
							{item.value}
						</CardTitle>
						<div className="flex items-center justify-between gap-2">
							{Number.parseFloat(item.changePercent) > 0 ? (
								<div className="text-green-500 inline-flex ">
									<ArrowUpIcon size={16} />
									<span className="text-sm font-medium font-mono">
										{item.changePercent.substring(1)}
									</span>
								</div>
							) : (
								<div className="text-red-500 inline-flex">
									<ArrowDownIcon size={16} />
									<span className="text-sm font-medium font-mono">
										{item.changePercent.substring(1)}
									</span>
								</div>
							)}
						</div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
