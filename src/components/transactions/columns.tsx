import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, formatDate } from "@/lib/format";
import type { TransactionItem } from "@/types";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableColumnStatus } from "../data-table-column-status";

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

export const dateFilterFn: FilterFn<TransactionItem> = (
	row,
	columnId,
	filterValue: DateRange | null | undefined
) => {
	const rowDate = row.getValue(columnId) as Date | undefined;

	if (!filterValue || !filterValue.from || !rowDate) return true;

	const from = startOfDay(filterValue.from);
	const to = filterValue.to ? endOfDay(filterValue.to) : endOfDay(filterValue.from);

	return isWithinInterval(rowDate, { start: from, end: to });
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
		cell: ({ row }) => <div className="text-muted-foreground pl-2">{row.original.activity}</div>,
		filterFn: searchActivityFilterFn
	},
	{
		accessorKey: "status",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
		cell: ({ row }) => <DataTableColumnStatus status={row.original.status} />,
		filterFn: statusFilterFn
	},
	{
		accessorKey: "date",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
		cell: ({ row }) => (
			<div className="text-muted-foreground font-mono pl-2">{formatDate(row.original.date)}</div>
		),
		filterFn: dateFilterFn
	},
	{
		accessorKey: "amount",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
		cell: ({
			row: {
				original: { amount, currency }
			}
		}) => <div className="text-muted-foreground pl-2">{formatCurrency(amount, currency)}</div>
	}
];
