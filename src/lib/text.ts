import { createWorker } from "tesseract.js";

export async function recognizeTextFromImage(file: File): Promise<string> {
	const buffer = await file.arrayBuffer();
	const worker = await createWorker("eng");
	const {
		data: { text }
		// @ts-ignore
	} = await worker.recognize(buffer);
	await worker.terminate();

	return text;
}
