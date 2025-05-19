import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	CircleDollarSignIcon,
	CreditCardIcon,
	DatabaseIcon,
	TrendingDownIcon,
	TrendingUpIcon,
	WalletIcon
} from "lucide-react";

const data = [
	{
		title: "Expenses",
		value: "$1,000",
		changePercent: "+10%",
		icon: DatabaseIcon
	},
	{
		title: "Income",
		value: "$583.54",
		changePercent: "-4%",
		icon: CircleDollarSignIcon
	},
	{
		title: "Balance",
		value: "$1234.56",
		changePercent: "-4.6%",
		icon: CreditCardIcon
	},
	{
		title: "Savings",
		value: "$800.32",
		changePercent: "-2.5%",
		icon: WalletIcon
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
					<CardHeader className="relative py-1">
						<CardDescription className="text-base font-medium flex items-center gap-2">
							<div className="p-1 size-6 bg-muted rounded dark:bg-neutral-700/50 dark:text-neutral-300">
								<item.icon className="mr-2 size-4" />
							</div>
							<span>{item.title}</span>
						</CardDescription>
						<CardTitle className="@[250px]/card:text-3xl text-2xl font-mont  tabular-nums mt-2">
							{item.value}
						</CardTitle>
						<div className="absolute right-4 bottom-0 mb-2">
							{item.changePercent.startsWith("-") ? (
								<Badge className="bg-destructive/10 dark:bg-destructive/70 text-red-400 font-semibold font-mont">
									<TrendingDownIcon className="mr-2 h-4 w-4" />
									{item.changePercent}
								</Badge>
							) : (
								<Badge className="bg-primary/10 text-teal-600 font-semibold font-mont">
									<TrendingUpIcon className="mr-2 h-4 w-4" />
									{item.changePercent}
								</Badge>
							)}
						</div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
