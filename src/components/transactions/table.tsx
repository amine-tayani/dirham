import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { TransactionItem } from "@/types";
import { exportAsCSV, exportAsJSON } from "@/utils/export";
import {
	type ColumnFiltersState,
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

import { DateRangePickerFilter } from "@/components/date-range-picker-filter";
import { DeleteTransactionDialog } from "@/components/transactions/delete-transaction-dialog";
import { DownloadIcon, FilterIcon, ListFilterIcon, TrashIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { columns } from "./columns";
import { CreateTransactionSheet } from "./create-transaction-sheet";

export function TransactionsTable({
	data,
	isLoading
}: { data: TransactionItem[]; isLoading: boolean }) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const id = React.useId();
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [isTransactionSheetOpen, setTransactionSheetOpen] = React.useState(false);
	const [deleteTransactionDialogOpen, setDeleteTransactionDialogOpen] = React.useState(false);

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

	const EXPORT_FILE_NAME = "transactions";

	const getDataToExport = () => {
		const selectedRows = table.getSelectedRowModel().rows;
		return selectedRows.length > 0 ? selectedRows.map((r) => r.original) : data;
	};

	const handleExportJSON = (e: React.MouseEvent) => {
		e.stopPropagation();
		exportAsJSON(getDataToExport(), EXPORT_FILE_NAME);
	};

	const handleExportCSV = (e: React.MouseEvent) => {
		e.stopPropagation();
		exportAsCSV(getDataToExport(), EXPORT_FILE_NAME);
	};

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3 relative">
					<Input
						id={`${id}-input`}
						type="text"
						ref={inputRef}
						className={cn(
							"peer min-w-60 ps-9 h-8 focus-visible:ring-0 border border-muted-foreground/30 dark:border-none shadow-none"
						)}
						value={(table.getColumn("description")?.getFilterValue() ?? "") as string}
						onChange={(e) => table.getColumn("description")?.setFilterValue(e.target.value as string)}
						placeholder="Search transactions... "
						aria-label="Filter by description"
					/>
					<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
						<ListFilterIcon className="size-4" aria-hidden="true" />
					</div>

					{/* Filter by status */}
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" size="sm">
								<FilterIcon className="-ms-1 text-muted-foreground/50 size-4" aria-hidden="true" />
								Status
								{selectedStatuses.length > 0 && (
									<span className="text-muted-foreground/70 -me-1 inline-flex h-4 max-h-full items-center rounded border px-1 font-mono text-[0.625rem] font-medium">
										{selectedStatuses.length}
									</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto min-w-40 p-3 " align="start">
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
												<span className="text-muted-foreground ms-2 text-xs font-mono">
													{statusCounts.get(value)}
												</span>
											</Label>
										</div>
									))}
								</div>
							</div>
						</PopoverContent>
					</Popover>
					<DateRangePickerFilter
						date={table.getColumn("date")?.getFilterValue() as DateRange | undefined}
						setDate={(date) => table.getColumn("date")?.setFilterValue(date)}
					/>
				</div>
				<div className="flex items-center gap-3">
					<div>
						{table.getSelectedRowModel().rows.length > 0 && (
							<Button
								onClick={() => setDeleteTransactionDialogOpen(true)}
								variant="outline"
								size="sm"
								className={cn("dark:!bg-neutral-700 dark:[&>svg]:text-foreground ")}
							>
								<TrashIcon className="size-4 text-muted-foreground/50" />
								<span className="hidden lg:inline">
									Delete{" "}
									{table.getSelectedRowModel().rows.length > 0 && (
										<span className="font-mono text-sm">
											({table.getSelectedRowModel().rows.length})
										</span>
									)}
								</span>
							</Button>
						)}
						{deleteTransactionDialogOpen && (
							<DeleteTransactionDialog
								isOpen={deleteTransactionDialogOpen}
								setIsOpen={setDeleteTransactionDialogOpen}
							/>
						)}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className={cn(
									table.getSelectedRowModel().rows.length > 0 &&
									"dark:!bg-neutral-700 dark:[&>svg]:text-foreground"
								)}
							>
								<DownloadIcon className="size-4 text-muted-foreground/50" />
								<span className="hidden lg:inline">
									Export{" "}
									{table.getSelectedRowModel().rows.length > 0 && (
										<span className="font-mono text-sm">
											({table.getSelectedRowModel().rows.length})
										</span>
									)}
								</span>
								<span className="lg:hidden">Export</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="flex flex-col gap-0.5 p-2">
							<DropdownMenuItem onClick={handleExportJSON}>Export as JSON</DropdownMenuItem>
							<DropdownMenuItem onClick={handleExportCSV}>Export as CSV</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant="outline" size="sm" onClick={() => setTransactionSheetOpen(true)}>
						Add Transaction
					</Button>
					<CreateTransactionSheet
						open={isTransactionSheetOpen}
						onOpenChange={setTransactionSheetOpen}
					/>
				</div>
			</div>

			{isLoading ? (
				<div className="space-y-2 p-1">
					{Array.from({ length: 6 }).map((_, index) => (
						<div key={index} className="flex items-center space-x-4 py-2.5">
							<Skeleton className="size-8" />
							<Skeleton className="h-8 w-32" />
							<Skeleton className="h-8 w-96" />
							<Skeleton className="h-8 w-32" />
							<Skeleton className="h-8 w-72" />
							<Skeleton className="h-8 w-48" />
						</div>
					))}
				</div>
			) : (
				<div className="rounded-md border [&>div]:max-h-[350px] overflow-y-auto snap-y scroll-pb-0 dark:bg-neutral-950">
					<Table className="dark:bg-neutral-950">
						<TableHeader className="sticky top-0 z-20 dark:bg-background backdrop-blur-xs">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className={cn(
										" dark:bg-muted/50 bg-transparent",
										"[&>*]:border-0 [&>:not(:last-child)]:border-r "
									)}
								>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className={cn(
												"relative select-none truncate border-b border-border [&>.cursor-col-resize]:last:opacity-0"
											)}
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody
							id="content"
							tabIndex={-1}
							className="relative transition-colors focus-visible:outline"
						>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<React.Fragment key={row.id}>
										<TableRow
											onClick={() => row.toggleSelected()}
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											className="h-11"
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									</React.Fragment>
								))
							) : (
								<React.Fragment>
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
											No transactions.
										</TableCell>
									</TableRow>
								</React.Fragment>
							)}
						</TableBody>
					</Table>
				</div>
			)}
		</>
	);
}
