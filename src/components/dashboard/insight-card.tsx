import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface InsightCardProps {
	title: string;
	value: string;
	changePercent: string;
}

export function InsightCard({ title, value, changePercent }: InsightCardProps) {
	const isPositive = Number.parseFloat(changePercent) > 0;
	const changeValue = changePercent.replace(/[+-]/, "");

	return (
		<Card className="flex flex-col border-border shadow-none">
			<CardHeader className="relative">
				<CardDescription className="text-sm font-medium -mt-2">
					<span>{title}</span>
				</CardDescription>
				<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums mt-5">
					{value}
				</CardTitle>
				<div className="flex items-center justify-between gap-2">
					<div className="font-mono text-sm font-medium flex items-center gap-1">
						<div
							className={`inline-flex items-center ${
								isPositive ? "text-green-500" : "text-red-500"
							}`}
						>
							{isPositive ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
							<span className="text-sm font-mono font-medium ml-1">{changeValue}</span>
						</div>
						<span className="text-xs font-geist font-medium ml-2 text-muted-foreground/70">
							vs Last Month
						</span>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}
