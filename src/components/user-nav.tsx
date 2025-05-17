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
import { redirect, useRouter } from "@tanstack/react-router";
import type { User } from "better-auth";
import { DoorClosedIcon, LayoutIcon, MoonIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { toggleTheme } from "@/utils/toggle-theme";

export function UserNav({
	user,
	queryClient
}: {
	user: User;
	queryClient: QueryClient;
}) {
	const router = useRouter();

	if (!user) {
		redirect({ to: "/login" });
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="h-8 w-8 rounded-full">
					<AvatarImage src={user.image ?? ""} alt={user.name} />
					<AvatarFallback className="rounded-lg">
						{user.name.slice(0, 2).toLocaleUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-xl p-2"
				side="bottom"
				align="end"
				sideOffset={6}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage src={user.image ?? ""} alt={user.name} />
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
						<Switch onChange={toggleTheme} />
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
					className="text-destructive"
					onClick={async () => {
						await queryClient.invalidateQueries({ queryKey: ["user"] });
						await authClient.signOut();
						await router.invalidate();
					}}
				>
					<DoorClosedIcon className="size-5 text-destructive" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
