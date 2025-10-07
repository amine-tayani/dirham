import { createBlobAndURL, createFilename, createLink } from "./url";

export function exportAsJSON<T>(rows: T[], fileName: string) {
	const [blob, url] = createBlobAndURL(JSON.stringify(rows, null, 2), "application/json");
	const link = createLink(url, createFilename(fileName, "json"));
	link.click();
}

export function exportAsCSV<T>(rows: T[], fileName: string) {}
