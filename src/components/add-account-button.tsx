import {
	ArrowUpRightIcon,
	BadgeDollarSignIcon,
	BitcoinIcon,
	CreditCardIcon,
	HouseIcon,
	PlusIcon
} from "lucide-react";
import * as React from "react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from "@/components/ui/command";
import { Button } from "./ui/button";

export function AddAccountButton() {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<Button onClick={() => setOpen(true)} variant="dark">
				<PlusIcon className="size-4" />
				Add account
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput hideIcon placeholder="What would you like to add?" />
				<CommandList>
					<CommandEmpty>We found nothing for you to add.</CommandEmpty>
					<CommandGroup>
						<CommandItem>
							<BadgeDollarSignIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Cash</span>
							<CommandShortcut className="justify-center">⌘B</CommandShortcut>
						</CommandItem>

						<CommandItem>
							<CreditCardIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Credit Card</span>
						</CommandItem>
						<CommandItem>
							<BitcoinIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Crypto</span>
						</CommandItem>
						<CommandItem>
							<HouseIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Proprety</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Navigation">
						<CommandItem>
							<ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Go to apps</span>
						</CommandItem>
						<CommandItem>
							<ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Go to connections</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
