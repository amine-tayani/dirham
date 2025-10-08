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

export function exportAsCSV<T>(data: T[], fileName: string) {}
