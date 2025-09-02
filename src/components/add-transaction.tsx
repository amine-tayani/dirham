import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusIcon } from "lucide-react";

export default function AddTransaction() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<PlusIcon className="size-4" />
					<span className="hidden lg:inline">New transaction</span>
					<span className="lg:hidden">Add</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className="mb-2 flex flex-col gap-2">
					<DialogHeader>
						<DialogTitle className="text-left">Confirm and pay</DialogTitle>
						<DialogDescription className="text-left">
							Pay securely and cancel any time.
						</DialogDescription>
					</DialogHeader>
				</div>

				<form className="space-y-5">
					<div className="space-y-4">
						<RadioGroup className="grid-cols-2" defaultValue="yearly">
							<Label className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
								<RadioGroupItem
									id="radio-monthly"
									value="monthly"
									className="sr-only after:absolute after:inset-0"
								/>
								<p className="text-foreground text-sm font-medium">Monthly</p>
								<p className="text-muted-foreground text-sm">$32/month</p>
							</Label>
							<Label className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
								<RadioGroupItem
									id="radio-yearly"
									value="yearly"
									className="sr-only after:absolute after:inset-0"
								/>
								<div className="inline-flex items-start justify-between gap-2">
									<p className="text-foreground text-sm font-medium">Yearly</p>
									<Badge>Popular</Badge>
								</div>
								<p className="text-muted-foreground text-sm">$320/month</p>
							</Label>
						</RadioGroup>
						<div className="*:not-first:mt-2">
							<Label>Name on card</Label>
							<Input type="text" required />
						</div>
					</div>
					<Button type="button" className="w-full">
						Subscribe
					</Button>
				</form>

				<p className="text-muted-foreground text-center text-xs">
					Payments are non-refundable. Cancel anytime.
				</p>
			</DialogContent>
		</Dialog>
	);
}
