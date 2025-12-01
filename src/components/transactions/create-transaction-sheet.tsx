import CreateTransactionForm from "@/components/transactions/create-transaction-form";
import { ReceiptImageUpload } from "@/components/transactions/receipt-image-upload";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { transactionFormSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type * as z from "zod";

interface CreateTransactionSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

function SubmitButton({ onSuccess }: { onSuccess?: () => void }) {
	const form = useFormContext<z.infer<typeof transactionFormSchema>>();
	const isSubmitting = form.formState.isSubmitting;

	return (
		<div className="flex p-4 mx-2">
			<button
				type="submit"
				form="transaction-form"
				disabled={isSubmitting}
				className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
			>
				{isSubmitting ? "Saving..." : "Save Transaction"}
			</button>
		</div>
	);
}

export function CreateTransactionSheet({
	open,
	onOpenChange,
	onSuccess
}: CreateTransactionSheetProps) {
	const form = useForm<
		z.input<typeof transactionFormSchema>,
		unknown,
		z.output<typeof transactionFormSchema>
	>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: {
			activity: "",
			amount: "",
			currency: ""
		}
	});

	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			form.reset();
		}
		onOpenChange(isOpen);
	};

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent className="flex flex-col min-w-[500px] p-6 rounded-lg overflow-y-auto">
				<SheetHeader className="text-lg ml-1.5">
					<SheetTitle>Create transaction</SheetTitle>
				</SheetHeader>
				<FormProvider {...form}>
					<CreateTransactionForm />
					<ReceiptImageUpload />
					<SubmitButton onSuccess={onSuccess} />
				</FormProvider>
			</SheetContent>
		</Sheet>
	);
}
