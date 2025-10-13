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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
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
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DownloadIcon, FilterIcon, ListFilterIcon, Loader2Icon, TrashIcon } from "lucide-react";
import * as React from "react";
import AddTransactionDialog from "./add-transaction-dialog";
import { type TransactionItem, columns } from "./columns";
import { DeleteTransactionDialog } from "./delete-transaction-dialog";

dayjs.extend(localizedFormat);

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
						value={(table.getColumn("activity")?.getFilterValue() ?? "") as string}
						onChange={(e) => table.getColumn("activity")?.setFilterValue(e.target.value as string)}
						placeholder="Search transactions... "
						aria-label="Filter by activity"
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
					<AddTransactionDialog />
				</div>
			</div>

			{/* We need a better way to show loading state but for now this is fine */}
			{isLoading ? (
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								<Loader2Icon className="animate-spin size-5 mx-auto" />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			) : (
				<Table>
					<TableHeader className="sticky top-0 z-10 dark:bg-input/10 bg-neutral-50">
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
								<TableRow
									onClick={() => row.toggleSelected()}
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="h-12"
								>
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
			)}
		</>
	);
}
