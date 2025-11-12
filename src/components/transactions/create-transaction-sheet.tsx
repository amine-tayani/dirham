import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CreateTransactionForm from "./create-transaction-form";
import ReceiptScanner from "./receipt-scanner";

interface CreateTransactionSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreateTransactionSheet({ open, onOpenChange }: CreateTransactionSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="flex flex-col min-w-[500px] p-6 rounded-lg overflow-y-auto">
				<SheetHeader className="text-lg ml-1.5">
					<SheetTitle>Create transaction</SheetTitle>
				</SheetHeader>
				<CreateTransactionForm />
				<Separator className="mt-2 max-w-[400px] mx-auto" />
				<ReceiptScanner
					onTransactionsExtracted={() => {}}
					onCloseSheet={() => onOpenChange(false)}
				/>
			</SheetContent>
		</Sheet>
	);
}
