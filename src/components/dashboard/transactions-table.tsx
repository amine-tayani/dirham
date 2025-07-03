"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type FilterFn,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable
} from "@tanstack/react-table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
	CheckCircle2Icon,
	ChevronDownIcon,
	ColumnsIcon,
	FilterIcon,
	ListFilterIcon,
	LoaderIcon,
	MoreVerticalIcon,
	PlusIcon,
	XIcon
} from "lucide-react";
import * as React from "react";
import { z } from "zod";

dayjs.extend(localizedFormat);

// Schema definition
export const schema = z.object({
	id: z.string(),
	activity: z.string(),
	amount: z.number(),
	status: z.enum(["", "processing", "completed", "failed"]),
	date: z.date()
});

export type TransactionItem = z.infer<typeof schema>;

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<TransactionItem> = (row, columnId, filterValue) => {
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
const columns: ColumnDef<TransactionItem>[] = [
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
		header: "Activity",
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
		header: "Date",
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
					currency: "USD"
				}).format(row.original.amount)}
			</div>
		)
	},
	{
		id: "actions",
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
						size="icon"
					>
						<MoreVerticalIcon />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-32">
					<DropdownMenuItem>Edit</DropdownMenuItem>
					<DropdownMenuItem>Make a copy</DropdownMenuItem>
					<DropdownMenuItem>Favorite</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
];

// Main Table Component
export function TransactionsTable({ data }: { data: TransactionItem[] }) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const id = React.useId();
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		getRowId: (row) => row.id.toString(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues()
	});

	// Get unique status values
	const uniqueStatusValues = React.useMemo(() => {
		const statusColumn = table.getColumn("status");

		if (!statusColumn) return [];

		const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

		return values.sort();
	}, [table.getColumn("status")?.getFacetedUniqueValues()]);

	// Get counts for each status
	const statusCounts = React.useMemo(() => {
		const statusColumn = table.getColumn("status");
		if (!statusColumn) return new Map();
		return statusColumn.getFacetedUniqueValues();
	}, [table.getColumn("status")?.getFacetedUniqueValues()]);

	const selectedStatuses = React.useMemo(() => {
		const filterValue = table.getColumn("status")?.getFilterValue() as string[];
		return filterValue ?? [];
	}, [table.getColumn("status")?.getFilterValue()]);

	const handleStatusChange = (checked: boolean, value: string) => {
		const filterValue = table.getColumn("status")?.getFilterValue() as string[];
		const newFilterValue = filterValue ? [...filterValue] : [];

		if (checked) {
			newFilterValue.push(value);
		} else {
			const index = newFilterValue.indexOf(value);
			if (index > -1) {
				newFilterValue.splice(index, 1);
			}
		}

		table.getColumn("status")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
	};

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3 relative">
					<Input
						id={`${id}-input`}
						ref={inputRef}
						className={cn(
							"peer min-w-60 ps-9 focus-visible:ring-0",
							Boolean(table.getColumn("activity")?.getFilterValue()) && "pe-9"
						)}
						value={(table.getColumn("activity")?.getFilterValue() ?? "") as string}
						onChange={(e) => table.getColumn("activity")?.setFilterValue(e.target.value)}
						placeholder="Filter by activity..."
						type="text"
						aria-label="Filter by activity"
					/>
					<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
						<ListFilterIcon size={16} aria-hidden="true" />
					</div>
					{Boolean(table.getColumn("name")?.getFilterValue()) && (
						<Button
							className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
							aria-label="Clear filter"
							onClick={() => {
								table.getColumn("name")?.setFilterValue("");
								if (inputRef.current) {
									inputRef.current.focus();
								}
							}}
						>
							<XIcon size={16} className="3.5" aria-hidden="true" />
						</Button>
					)}

					{/* Filter by status */}
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">
								<FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
								Status
								{selectedStatuses.length > 0 && (
									<span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
										{selectedStatuses.length}
									</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto min-w-36 p-3" align="start">
							<div className="space-y-3">
								<div className="text-muted-foreground text-xs font-medium">Filters</div>
								<div className="space-y-3">
									{uniqueStatusValues.map((value, i) => (
										<div key={value} className="flex items-center gap-2">
											<Checkbox
												id={`${id}-${i}`}
												checked={selectedStatuses.includes(value)}
												onCheckedChange={(checked: boolean) => handleStatusChange(checked, value)}
											/>
											<Label className="flex grow justify-between gap-2 font-normal">
												{value}{" "}
												<span className="text-muted-foreground ms-2 text-xs">
													{statusCounts.get(value)}
												</span>
											</Label>
										</div>
									))}
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex items-center gap-3">
					{/* Toggle columns visibility */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<ColumnsIcon className="mr-2 h-4 w-4" />
								<span className="hidden lg:inline">Customize Columns</span>
								<span className="lg:hidden">Columns</span>
								<ChevronDownIcon className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							{table
								.getAllColumns()
								.filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
								.map((column) => (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>

					<Button variant="outline" size="sm">
						<PlusIcon className="mr-2 h-4 w-4" />
						<span className="hidden lg:inline">Add transaction</span>
						<span className="lg:hidden">Add</span>
					</Button>
				</div>
			</div>

			<Table>
				<TableHeader className="sticky top-0 z-10 bg-muted">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="relative">
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No transactions.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}
