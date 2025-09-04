import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { insertTransactionSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

export default function AddTransaction() {
	const formSchema = insertTransactionSchema.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
		userId: true
	});
	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			activity: "",
			amount: 0,
			date: new Date(),
			status: "processing",
			currency: "USD"
		}
	});

	return (
		<div>
			<Dialog>
				<form>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm">
							New Transaction
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px] p-8">
						<DialogHeader>
							<DialogTitle> Add a new transaction </DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 mt-5">
							<div className="grid gap-3">
								<Label htmlFor="name-1">Name</Label>
								<Input id="name-1" name="name" defaultValue="Pedro Duarte" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="username-1">Username</Label>
								<Input id="username-1" name="username" defaultValue="@peduarte" />
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</form>
			</Dialog>
		</div>
	);
}
