import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import authClient from "@/lib/auth-client";
import type { QueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { User } from "better-auth";
import { LayoutIcon, LogOutIcon, MoonIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useId, useState } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export function UserNav({
	user,
	queryClient
}: {
	user: User;
	queryClient: QueryClient;
}) {
	const id = useId();
	const [checked, setChecked] = useState<boolean>(false);
	const router = useRouter();

	return user ? (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="size-8 rounded-full">
					{/* hardcoded image for now until google rate limit is fixed */}
					<AvatarImage src="https://i.pravatar.cc/150?img=3" alt={user.name} />
					<AvatarFallback className="rounded-lg text-xs">
						{user.name.slice(0, 2).toLocaleUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-60 rounded-xl p-2" sideOffset={6}>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="size-8 rounded-lg">
							{/* hardcoded image for now until google rate limit is fixed */}
							<AvatarImage src="https://i.pravatar.cc/150?img=3" alt={user.name} />
							<AvatarFallback className="rounded-lg">
								{user.name.slice(0, 2).toLocaleUpperCase()}
							</AvatarFallback>
						</Avatar>
						<span className="truncate font-medium text-base">{user.name}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon className="size-5" />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<MoonIcon className="size-5" />
							Dark mode
						</div>
						<div className="inline-flex items-center gap-2">
							<Switch
								checked={checked}
								id={id}
								className="data-[state=unchecked]:border-input data-[state=unchecked]:[&_span]:bg-input data-[state=unchecked]:bg-transparent [&_span]:transition-all data-[state=unchecked]:[&_span]:size-4 data-[state=unchecked]:[&_span]:translate-x-0.5 data-[state=unchecked]:[&_span]:shadow-none data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5"
							/>
							<Label htmlFor={id} className="sr-only">
								dark theme switch
							</Label>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LayoutIcon className="size-5" />
						Dashboard
					</DropdownMenuItem>

					<DropdownMenuItem>
						<SettingsIcon className="size-5" />
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="text-destructive dark:text-red-400"
					onClick={async () => {
						await queryClient.invalidateQueries({ queryKey: ["user"] });
						await authClient.signOut();
						await router.invalidate();
					}}
				>
					<LogOutIcon className="size-5 text-destructive dark:text-red-400" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	) : null;
}
