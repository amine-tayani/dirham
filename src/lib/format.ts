import dayjs from "dayjs";

export function formatDate(value: Date | string) {
	return dayjs(value).format("ll HH:mm:ss");
}

export function formatCurrency(amount: number | string, currency: string) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency
	}).format(Number(amount));
}
