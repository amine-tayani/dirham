import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function greetUser() {
	const hour = new Date().getHours();
	return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

export function shorterDateFormatter(value: any) {
	const date = new Date(value);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}

export function compactNumberFormatter(value: number) {
	return new Intl.NumberFormat("en", {
		notation: "compact",
		compactDisplay: "short"
	}).format(value);
}
