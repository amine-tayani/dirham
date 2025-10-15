import { cn } from "@/lib/utils"; // assuming you have a cn() utility
import type { TransactionItem } from "@/types";

type StatusConfig = {
	label: string;
	color: string;
};

const STATUS_MAP: Record<TransactionItem["status"], StatusConfig> = {
	completed: { label: "Completed", color: "text-green-500" },
	failed: { label: "Failed", color: "text-red-500" },
	processing: { label: "Processing", color: "text-yellow-500" }
};

interface DataTableColumnStatusProps {
	status: TransactionItem["status"];
}

export function DataTableColumnStatus({ status }: DataTableColumnStatusProps) {
	const { label, color } = STATUS_MAP[status];

	return <span className={cn("font-mono px-2", color)}>{label}</span>;
}
