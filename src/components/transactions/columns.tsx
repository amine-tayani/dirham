import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { transactions } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import dayjs from "dayjs";
import type { InferSelectModel } from "drizzle-orm";
import {
	ArrowUpDownIcon,
	CheckCircle2Icon,
	ChevronDownIcon,
	ChevronUpIcon,
	LoaderIcon,
	XIcon
} from "lucide-react";

export type TransactionItem = Omit<InferSelectModel<typeof transactions>, "userId" | "updated_at">;
// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<TransactionItem> = (row, filterValue) => {
	const searchableRowContent = row.original.activity.toLowerCase();
	const searchTerm = (filterValue ?? "").toLowerCase();
	return searchableRowContent.includes(searchTerm);
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
			<div className="flex items-center justify-center">
				<Checkbox
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
			<div className="flex items-center justify-center">
				<Checkbox
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
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						"h-auto p-0 font-medium justify-start",
						column.getIsSorted() && "dark:bg-neutral-800 bg-background text-foreground "
					)}
				>
					Activity
					{column.getIsSorted() === "asc" ? (
						<ChevronUpIcon className="size-3.5" />
					) : column.getIsSorted() === "desc" ? (
						<ChevronDownIcon className="size-3.5" />
					) : (
						<ArrowUpDownIcon className="size-3.5" />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="text-muted-foreground">{row.original.activity}</div>,
		filterFn: multiColumnFilterFn
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
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						"h-auto p-0 font-medium justify-start",
						column.getIsSorted() && "dark:bg-neutral-800 bg-background text-foreground"
					)}
				>
					Date
					{column.getIsSorted() === "asc" ? (
						<ChevronUpIcon className="size-4" />
					) : column.getIsSorted() === "desc" ? (
						<ChevronDownIcon className="size-4" />
					) : (
						<ArrowUpDownIcon className="size-3.5" />
					)}
				</Button>
			);
		},
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
