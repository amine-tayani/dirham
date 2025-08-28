import {
	ArrowUpRightIcon,
	CircleFadingPlusIcon,
	FileInputIcon,
	FolderPlusIcon,
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
					<CommandGroup heading="Add a new account">
						<CommandItem>
							<FolderPlusIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>New folder</span>
							<CommandShortcut className="justify-center">⌘N</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<FileInputIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Import document</span>
							<CommandShortcut className="justify-center">⌘I</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CircleFadingPlusIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Add block</span>
							<CommandShortcut className="justify-center">⌘B</CommandShortcut>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Navigation">
						<CommandItem>
							<ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Go to dashboard</span>
						</CommandItem>
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
