import { transactionFormSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import type z from "zod";

export default function AddTransaction() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<
		z.input<typeof transactionFormSchema>,
		unknown,
		z.output<typeof transactionFormSchema>
	>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: {
			activity: "",
			amount: 0,
			date: new Date(),
			status: "processing",
			currency: "USD"
		}
	});

	const [open, setOpen] = useState(true);
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [startTime, setStartTime] = useState("09:00");

	const timeOptions = useMemo(() => {
		const options = [];
		for (let hour = 0; hour <= 23; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const formattedHour = hour.toString().padStart(2, "0");
				const formattedMinute = minute.toString().padStart(2, "0");
				const value = `${formattedHour}:${formattedMinute}`;
				const tempDate = new Date(2000, 0, 1, hour, minute);
				const label = format(tempDate, "h:mm a");
				options.push({ value, label });
			}
		}

		if (!options.find((opt) => opt.value === "23:59")) {
			const endOfDay = new Date(2000, 0, 1, 23, 59);
			options.push({ value: "23:59", label: format(endOfDay, "h:mm a") });
		}

		return options;
	}, []);

	const onSubmit = async (values: z.infer<typeof transactionFormSchema>) => {
		console.log(values);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					New Transaction
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0 sm:max-w-lg gap-0">
				<DialogHeader className="border-b px-6 py-4 pt-5">
					<DialogTitle>Add a new transaction</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-6 p-6">
							<div className="space-y-2">
								<Label
									className="text-sm font-medium text-foreground dark:text-foreground"
									htmlFor="title"
								>
									Title
								</Label>
								<FormField
									control={form.control}
									name="activity"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													className="mt-2 border border-border shadow-none dark:border-none"
													readOnly={isLoading}
													id="title"
													name="title"
													placeholder="e.g., Spotify premium subscription"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* <div className="space-y-2">
							<Label htmlFor="attendees">Attendees</Label>
							<Input
								id="attendees"
								name="attendees"
								placeholder="user1@example.com, user2@example.com"
							/>
							<p className="text-xs text-muted-foreground">
								Enter email addresses separated by commas.
							</p>
						</div> */}

							{/* <div className="grid grid-cols-3 gap-4">
							<div className="space-y-2 col-span-2">
								<Label htmlFor="date">Date</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											id="date"
											variant={"outline"}
											className={cn(
												"w-full justify-start text-left font-normal",
												!date && "text-muted-foreground"
											)}
										>
											<CalendarIcon className="mr-1 h-4 w-4 shrink-0" />{" "}
											{date ? format(date, "PPP") : <span>Pick a date</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
									</PopoverContent>
								</Popover>
							</div>

							<div className="space-y-2">
								<Label htmlFor="time">Time</Label>
								<Select value={startTime} onValueChange={setStartTime}>
									<SelectTrigger id="time" className="w-full">
										<SelectValue placeholder="Select time" />
									</SelectTrigger>
									<SelectContent>
										{timeOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div> */}
						</div>

						<div className="flex items-center justify-end border-t p-4 space-x-2">
							<DialogClose asChild>
								<Button type="button" variant="ghost">
									Cancel
								</Button>
							</DialogClose>
							<Button disabled={isLoading} type="submit" size="sm">
								<div className="flex items-center">
									{isLoading ? (
										<>
											<span>Processing...</span>
											<LoaderCircle className="animate-spin ml-2" />
										</>
									) : (
										"Save"
									)}
								</div>
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
