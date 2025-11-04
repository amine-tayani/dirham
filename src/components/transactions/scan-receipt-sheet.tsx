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
import { CheckCircle, Loader2 } from "lucide-react";
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
		} else {
			setPreview(null);
		}
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
			<SheetContent className="flex flex-col items-center gap-6 overflow-y-auto">
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
								"w-full h-64 border-2 border-dashed rounded-xl flex flex-col justify-center items-center text-center cursor-pointer transition-all",
								file
									? "border-primary bg-muted/30"
									: "border-muted-foreground/30 hover:border-primary/50"
							)}
						>
							{preview ? (
								<img src={preview} alt="preview" className="max-h-56 rounded-md" />
							) : (
								<>
									<p className="text-sm text-muted-foreground">
										<span className="font-medium text-primary">Drag</span> or{" "}
										<label htmlFor="receipt" className="text-primary underline cursor-pointer">
											upload
										</label>{" "}
										the receipt here
									</p>
									<p className="text-xs text-muted-foreground mt-1">*JPG, JPEG and PDF</p>
									<input
										id="receipt"
										type="file"
										accept="image/*,application/pdf"
										className="hidden"
										onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
									/>
								</>
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
