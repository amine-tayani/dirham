import { CalendarDatePicker as CalendarDateRangePicker } from "@/components/ui/calendar-date-picker";
import type { DateRange } from "react-day-picker";

interface DateRangePickerFilterProps {
	date: DateRange | undefined;
	setDate: (date: DateRange | undefined) => void;
}

export function DateRangePickerFilter({ date, setDate }: DateRangePickerFilterProps) {
	return (
		<CalendarDateRangePicker
			variant="outline"
			date={date || { from: new Date(), to: new Date() }}
			onDateSelect={({ from, to }) => {
				setDate({ from, to });
			}}
		/>
	);
}
