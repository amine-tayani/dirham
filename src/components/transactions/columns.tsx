import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { transactions } from "@/lib/db/schema";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import dayjs from "dayjs";
import type { InferSelectModel } from "drizzle-orm";
import { CheckCircle2Icon, LoaderIcon, XIcon } from "lucide-react";
import { DataTableColumnHeader } from "../data-table-column-header";

export type TransactionItem = Omit<InferSelectModel<typeof transactions>, "userId" | "updated_at">;

const searchActivityFilterFn: FilterFn<TransactionItem> = (row, columnId, filterValue: string) => {
	const value = String(row.getValue(columnId) ?? "").toLowerCase();
	const searchTerm = String(filterValue ?? "").toLowerCase();
	return value.includes(searchTerm);
};

const statusFilterFn: FilterFn<TransactionItem> = (row, columnId, filterValue: string[]) => {
	if (!filterValue?.length) return true;
	const status = row.getValue(columnId) as string;
	return filterValue.includes(status);
};

// Column definitions
export const columns: ColumnDef<TransactionItem>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="flex items-center justify-center pr-1.5">
				<Checkbox
					className="size-3.5"
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center pr-1.5">
				<Checkbox
					className="size-3.5"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: "id",
		header: "Order ID",
		cell: ({ row }) => <div className="text-muted-foreground">{row.original.id}</div>,
		enableHiding: false,
		enableSorting: false
	},
	{
		accessorKey: "activity",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Activity" />,
		cell: ({ row }) => <div className="text-muted-foreground">{row.original.activity}</div>,
		filterFn: searchActivityFilterFn
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Badge
				variant="outline"
				className="flex gap-1 px-1.5 text-muted-foreground font-mono [&_svg]:size-3"
			>
				{row.original.status === "completed" ? (
					<CheckCircle2Icon className="text-green-500 dark:text-green-400" />
				) : row.original.status === "failed" ? (
					<XIcon className="text-red-500 dark:text-red-400" />
				) : (
					<LoaderIcon />
				)}
				{row.original.status}
			</Badge>
		),
		filterFn: statusFilterFn
	},
	{
		accessorKey: "date",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
		cell: ({ row }) => (
			<div className="text-muted-foreground font-sans">
				{dayjs(row.original.date).format("lll")}
			</div>
		)
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: row.original.currency
				}).format(Number(row.original.amount))}
			</div>
		)
	}
];
