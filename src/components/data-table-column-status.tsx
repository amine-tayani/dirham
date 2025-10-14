import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // assuming you have a cn() utility
import type { TransactionItem } from "@/types";
import { CheckCircle2Icon, LoaderIcon, XIcon } from "lucide-react";

type StatusConfig = {
	label: string;
	icon?: React.ElementType;
	color: string;
};

const STATUS_MAP: Record<TransactionItem["status"], StatusConfig> = {
	completed: {
		label: "completed",
		icon: CheckCircle2Icon,
		color: "text-green-500 dark:text-green-400"
	},
	failed: {
		label: "failed",
		icon: XIcon,
		color: "text-red-500 dark:text-red-400"
	},
	processing: {
		label: "processing",
		icon: LoaderIcon,
		color: "text-yellow-500 dark:text-yellow-400 animate-spin"
	}
};

interface DataTableColumnStatusProps {
	status: TransactionItem["status"];
}

export function DataTableColumnStatus({ status }: DataTableColumnStatusProps) {
	const { label, icon: Icon, color } = STATUS_MAP[status];

	return (
		<Badge
			variant="outline"
			className={cn(
				"flex items-center gap-1 px-1.5 font-mono text-muted-foreground [&_svg]:size-3"
			)}
		>
			{Icon && <Icon className={color} />}
			{label}
		</Badge>
	);
}
