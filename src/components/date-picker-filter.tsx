import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
	calendar: z.object({
		from: z.date(),
		to: z.date()
	}),
	datePicker: z.object({
		from: z.date(),
		to: z.date()
	})
});

export function DatePickerFilter() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			calendar: {
				from: new Date(new Date().getFullYear(), 0, 1),
				to: new Date()
			},
			datePicker: {
				from: new Date(),
				to: new Date()
			}
		}
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		toast(
			`1. Date range: ${data.calendar.from.toDateString()} - ${data.calendar.to.toDateString()}
      \n2. Single date: ${data.datePicker.from.toDateString()}`
		);
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="calendar"
						render={({ field }) => (
							<FormItem>
								<FormControl className="w-full">
									<CalendarDatePicker
										variant="outline"
										date={field.value}
										onDateSelect={({ from, to }) => {
											form.setValue("calendar", { from, to });
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
}
