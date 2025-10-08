import { toast } from "sonner";
import { createBlobAndURL, createFilename, createLink } from "./url";

export function exportAsJSON<T>(data: T[], fileName: string) {
	try {
		const [, url] = createBlobAndURL(JSON.stringify(data, null, 2), "application/json");
		const link = createLink(url, createFilename(fileName, "json"));
		link.click();
		toast.success("Successfully exported data as JSON");
	} catch (error) {
		toast.error("Failed to export data as JSON");
	}
}

export function exportAsCSV<T extends Record<string, any>>(data: T[], fileName: string) {
	try {
		if (data.length === 0) {
			toast.error("No data to export");
			return;
		}

		const headers = Object.keys(data[0]);
		const csv = [
			headers.join(","),
			...data.map((row) =>
				headers
					.map((h) => {
						const val = row[h] ?? "";
						return typeof val === "string" && val.includes(",")
							? `"${val.replace(/"/g, '""')}"`
							: val;
					})
					.join(",")
			)
		].join("\n");

		const [blob, url] = createBlobAndURL(csv, "text/csv");
		const link = createLink(url, createFilename(fileName, "csv"));
		link.click();

		toast.success("Successfully exported data as CSV");
	} catch (error) {
		console.error(error);
		toast.error("Failed to export data as CSV");
	}
}
