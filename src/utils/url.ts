export function createFilename(filename: string, ext: string): string {
	const date = new Date().toISOString().split("T")[0];
	return `${filename}_${date}.${ext}`;
}

export function createBlobAndURL(data: string, mimeType: string): [Blob, string] {
	const blob = new Blob([data], { type: mimeType });
	const url = URL.createObjectURL(blob);
	return [blob, url];
}

export function createLink(url: string, fileName: string): HTMLAnchorElement {
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	return link;
}
