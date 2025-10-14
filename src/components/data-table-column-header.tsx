import type { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> extends ButtonProps {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
	...props
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<Button
			variant="link"
			size="sm"
			onClick={() => {
				column.toggleSorting(undefined);
			}}
			className={cn(
				"h-6 hover:bg-transparent w-full hover:no-underline flex gap-2 items-center justify-between",
				className
			)}
			{...props}
		>
			<span className="text-muted-foreground">{title}</span>
			<span className="flex flex-col">
				<ChevronUp
					className={cn(
						"-mb-0.5 size-3",
						column.getIsSorted() === "asc"
							? "text-black dark:text-white"
							: "text-muted-foreground/50"
					)}
				/>
				<ChevronDown
					className={cn(
						"-mt-0.5 size-3",
						column.getIsSorted() === "desc"
							? "text-black dark:text-white"
							: "text-muted-foreground/50"
					)}
				/>
			</span>
		</Button>
	);
}
