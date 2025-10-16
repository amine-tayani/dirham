import { Pill, PillIndicator, type PillIndicatorProps } from "@/components/ui/pill";
import type { TransactionItem } from "@/types";

type StatusConfig = {
	label: string;
	variant: PillIndicatorProps["variant"];
};

const STATUS_MAP: Record<TransactionItem["status"], StatusConfig> = {
	completed: { label: "Completed", variant: "success" },
	failed: { label: "Failed", variant: "error" },
	processing: { label: "Processing", variant: "warning" }
};

interface DataTableColumnStatusProps {
	status: TransactionItem["status"];
}

export function DataTableColumnStatus({ status }: DataTableColumnStatusProps) {
	const { label, variant } = STATUS_MAP[status];

	return (
		<div className="px-2">
			<Pill className="h-5 px-3">
				<PillIndicator variant={variant} />
				{label}
			</Pill>
		</div>
	);
}
