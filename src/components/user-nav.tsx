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
import {
	CreditCardIcon,
	GlobeIcon,
	LogOutIcon,
	SettingsIcon,
	ShieldIcon,
	UserIcon
} from "lucide-react";

export function UserNav({
	user,
	queryClient
}: {
	user: User;
	queryClient: QueryClient;
}) {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<img
					src={user.image || "https://i.pravatar.cc/150?img=3"}
					alt="Avatar"
					width={32}
					height={32}
					className="shrink-0 rounded-full size-10 object-cover object-center"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="max-w-64 rounded-xl p-2 shadow-none"
				sideOffset={6}
				align="end"
			>
				<DropdownMenuLabel className="flex items-start gap-3">
					<img
						src="https://i.pravatar.cc/150?img=3"
						alt="Avatar"
						width={32}
						height={32}
						className="shrink-0 rounded-full"
					/>
					<div className="flex min-w-0 flex-col">
						<span className="text-foreground truncate text-sm font-medium">{user.name}</span>
						<span className="text-muted-foreground truncate text-xs font-normal">{user.email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuLabel className="mt-3 text-primary dark:text-blue-400 uppercase text-xs">
					Profile & Security
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Profile</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShieldIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Security</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShieldIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>2F Authentication</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel className="mt-3 text-primary dark:text-blue-400 uppercase text-xs">
					Billing & Settings
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<SettingsIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>General Settings</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCardIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Billing</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<GlobeIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Language</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={async () => {
						await queryClient.invalidateQueries({ queryKey: ["user"] });
						await authClient.signOut();
						await router.invalidate();
					}}
				>
					<LogOutIcon size={16} aria-hidden="true" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
