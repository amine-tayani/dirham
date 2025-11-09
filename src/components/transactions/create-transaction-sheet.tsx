import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { createTransactionFn, parseReceiptFn } from "@/lib/functions/transaction";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import CreateTransactionForm from "./create-transaction-form";

interface CreateTransactionSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreateTransactionSheet({ open, onOpenChange }: CreateTransactionSheetProps) {
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
			<SheetContent className="flex flex-col min-w-[500px] p-6 rounded-lg overflow-y-auto">
				<SheetHeader className="text-lg ml-1.5">
					<SheetTitle>Create transaction</SheetTitle>
				</SheetHeader>
				<CreateTransactionForm />

				<Separator className="my-4" />

				<div className="ml-6">
					<Label>Scan receipt</Label>
					<p className="text-muted-foreground/50 text-xs mt-2">
						You can scan a receipt image so we can fill the form for you.
					</p>
				</div>
				{!transactions.length ? (
					<div className="flex flex-col items-center">
						<div
							onDrop={handleDrop}
							onDragOver={(e) => e.preventDefault()}
							className={cn(
								"w-full flex flex-col justify-center",
								"mb-4 h-[96px] border-dotted border-2 border-border text-center space-y-1",
								"items-center text-center cursor-pointer transition-all",
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
								<div className="flex flex-col text-center items-center justify-center gap-3">
									<div>
										<p className="text-xs text-muted-foreground">
											Drop your files here, or{" "}
											<span className="underline underline-offset-1">click to browse.</span>
										</p>
										<p className="text-xs text-muted-foreground">3MB file limit.</p>
									</div>
									<Input
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
							className="w-full"
							variant="milk"
							size="sm"
							onClick={handleScan}
							disabled={!file || loading}
						>
							{loading ? (
								<>
									<Loader2 className="animate-spin mr-2 h-5 w-5" />
									Scanning...
								</>
							) : (
								"Create"
							)}
						</Button>
					</div>
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
