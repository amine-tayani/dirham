import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from "@/components/ui/sheet";
import { createTransactionFn, parseReceiptFn } from "@/lib/functions/transaction";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2, UploadIcon } from "lucide-react";
import { useState } from "react";

interface ScanReceiptSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ScanReceiptSheet({ open, onOpenChange }: ScanReceiptSheetProps) {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);
	const [transactions, setTransactions] = useState<any[]>([]);

	const handleFile = (f: File) => {
		setFile(f);
		if (f.type.startsWith("image/")) {
			const url = URL.createObjectURL(f);
			setPreview(url);
		} else setPreview(null);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const dropped = e.dataTransfer.files[0];
		if (dropped) handleFile(dropped);
	};

	const handleScan = async () => {
		if (!file) return;
		setLoading(true);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await parseReceiptFn({ data: formData });
			setTransactions(res.transactions || []);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveAll = async () => {
		try {
			for (const tx of transactions) {
				await createTransactionFn(tx);
			}
			onOpenChange(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="flex flex-col items-center min-w-[500px] gap-6 p-8 overflow-y-auto">
				<SheetHeader className="mt-4 text-center">
					<SheetTitle>Scan Receipt</SheetTitle>
					<SheetDescription>Upload or scan a receipt</SheetDescription>
				</SheetHeader>

				{!transactions.length ? (
					<>
						<div
							onDrop={handleDrop}
							onDragOver={(e) => e.preventDefault()}
							className={cn(
								"w-full h-64 border rounded-xl flex flex-col justify-center items-center text-center cursor-pointer transition-all",
								file && "border-border bg-muted/30"
							)}
						>
							{preview ? (
								file?.type === "image/png" || file?.type === "image/jpeg" ? (
									<img src={preview} alt="preview" className="max-h-56 rounded-md object-contain" />
								) : (
									<p className="text-sm text-muted-foreground text-center">Unsupported file type</p>
								)
							) : (
								<div className="flex flex-col items-center justify-center gap-3">
									<div className="mb-2 size-10 rounded-lg bg-muted-foreground/10 flex items-center justify-center">
										<UploadIcon className="size-5" />
									</div>
									<p className="text-lg text-muted-foreground text-center">
										<span className="font-medium text-xl leading-loose text-foreground">
											Drag and drop your receipt here
										</span>
										<br />
										<label
											htmlFor="receipt"
											className="text-muted-foreground cursor-pointer hover:underline"
										>
											or click to select an image
										</label>
									</p>
									<input
										id="receipt"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
									/>
								</div>
							)}
						</div>

						<Button
							onClick={handleScan}
							disabled={!file || loading}
							className="w-full h-11 rounded-xl font-semibold"
						>
							{loading ? (
								<>
									<Loader2 className="animate-spin mr-2 h-5 w-5" />
									Scanning...
								</>
							) : (
								"Scan Receipt"
							)}
						</Button>

						<Button
							onClick={() => {
								setFile(null);
								setPreview(null);
							}}
							className="text-sm text-muted-foreground hover:underline"
						>
							Add another expense
						</Button>
					</>
				) : (
					<div className="w-full space-y-4">
						<h3 className="text-lg font-semibold">Review extracted transactions</h3>
						{transactions.map((tx, i) => (
							<div key={i} className="border rounded-lg p-4 flex justify-between items-center">
								<div>
									<p className="font-medium">{tx.activity}</p>
									<p className="text-sm text-muted-foreground">
										{tx.date} — {tx.currency} {tx.amount}
									</p>
								</div>
								<CheckCircle className="text-green-500 h-5 w-5" />
							</div>
						))}
						<Button onClick={handleSaveAll} className="w-full h-11 rounded-xl">
							Save All
						</Button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
