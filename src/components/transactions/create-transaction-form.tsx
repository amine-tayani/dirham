import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { statusValues, type transactionFormSchema } from "@/lib/db/schema";
import { createTransactionFn } from "@/lib/functions/transaction";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

interface CreateTransactionFormProps {
	onOpenChange: (isOpen: boolean) => void;
}

export default function CreateTransactionForm({ onOpenChange }: CreateTransactionFormProps) {
	const [date, setDate] = useState<Date | undefined>();
	const queryClient = useQueryClient();

	const form = useFormContext<z.infer<typeof transactionFormSchema>>();

	// Sync date with form value
	React.useEffect(() => {
		const formDate = form.getValues("date");
		if (formDate && formDate instanceof Date) {
			setDate(formDate);
		}
	}, [form.watch("date")]);

	const mutation = useMutation({
		mutationFn: createTransactionFn,
		onSuccess: (data) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const onSubmit = async (values: z.infer<typeof transactionFormSchema>) => {
		await mutation.mutateAsync({
			data: values
		});
		onOpenChange(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-6 px-6">
					<div className="space-y-2">
						<Label
							className="text-sm font-medium text-foreground dark:text-foreground"
							htmlFor="title"
						>
							Description
						</Label>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											id="title"
											name="title"
											readOnly={mutation.isPending}
											placeholder="e.g., Groceries, Invoice payment"
										/>
									</FormControl>
									<FormDescription>
										A brief description of what the transaction is for
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label
								className="text-sm font-medium text-foreground dark:text-foreground"
								htmlFor="amount"
							>
								Amount
							</Label>
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												className="mt-2 shadow-none"
												readOnly={mutation.isPending}
												id="amount"
												name="amount"
												placeholder="e.g., 100"
											/>
										</FormControl>
										<FormDescription>Enter the transaction amount</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-2">
							<Label
								className="text-sm font-medium text-foreground dark:text-foreground"
								htmlFor="currency"
							>
								Currency
							</Label>
							<FormField
								control={form.control}
								name="currency"
								render={({ field }) => (
									<FormItem>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger id="currency" className="w-full">
													<SelectValue placeholder="Select a currency" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="USD">USD</SelectItem>
												<SelectItem value="EUR">EUR</SelectItem>
												<SelectItem value="MAD">MAD</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
										<FormDescription>The currency for this transaction</FormDescription>
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label
								className="text-sm font-medium text-foreground dark:text-foreground"
								htmlFor="status"
							>
								Status
							</Label>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger id="currency" className="w-full">
													<SelectValue placeholder="Select the status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{statusValues.map((value) => (
													<SelectItem key={value} value={value}>
														{value.toLocaleUpperCase()}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
										<FormDescription>The status of the transaction</FormDescription>
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-2">
							<Label
								className="text-sm font-medium text-foreground dark:text-foreground"
								htmlFor="date"
							>
								Date
							</Label>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													id="date"
													variant={"outline"}
													className={cn(
														"w-full justify-between text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													<span
														className={cn(
															!field.value ? "text-muted-foreground" : "text-foreground"
														)}
													>
														{field.value ? format(field.value, "PPP") : "Choose a date"}
													</span>
													<ChevronDown className="size-4 ml-2 text-muted-foreground/50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="center">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={(newDate) => {
														field.onChange(newDate);
														setDate(newDate);
													}}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
										<FormDescription>When this transaction occured</FormDescription>
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				<div className="flex px-6 py-2 mt-2 mb-0">
					<Button disabled={mutation.isPending} type="submit" variant="secondary">
						<div className="flex items-center">
							{mutation.isPending ? (
								<>
									<span>Saving...</span>
									<Spinner className="ml-2" />
								</>
							) : (
								"Create Transaction"
							)}
						</div>
					</Button>
				</div>
			</form>
		</Form>
	);
}
