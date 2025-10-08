import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

export function DeleteTransactionDialog({
	isOpen,
	setIsOpen
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) {
	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className="sm:max-w-sm [&>*]:text-center gap-8 p-8">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsOpen(false)}
					className="absolute right-2 top-2"
				>
					<XIcon className="size-4 text-muted-foreground/50" />
				</Button>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the transaction.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex !flex-col w-full">
					<AlertDialogAction>I understand, delete this transaction</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
