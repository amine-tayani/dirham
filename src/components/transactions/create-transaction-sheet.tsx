import CreateTransactionForm, { CreateTransactionButton } from "@/components/transactions/create-transaction-form";
import { ReceiptImageUpload } from "@/components/transactions/receipt-image-upload";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { transactionFormSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type * as z from "zod";

interface CreateTransactionSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

export function CreateTransactionSheet({
	open,
	onOpenChange,
}: CreateTransactionSheetProps) {
	const form = useForm<
		z.input<typeof transactionFormSchema>,
		unknown,
		z.output<typeof transactionFormSchema>
	>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: {
			description: "",
			amount: "",
			currency: "",
			status: "completed"
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
					<CreateTransactionForm onOpenChange={handleOpenChange} />
					<ReceiptImageUpload />
					<CreateTransactionButton isPending={form.formState.isSubmitting} />
				</FormProvider>
			</SheetContent>
		</Sheet>
	);
}
