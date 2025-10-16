import { format } from "date-fns";

export function formatDate(value: Date | string) {
	return format(new Date(`${value}`), "LLL dd, y HH:mm");
}

export function formatCurrency(amount: number | string, currency: string) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency
	}).format(Number(amount));
}
