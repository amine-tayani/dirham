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
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import authClient from "@/lib/auth-client";
import type { QueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "@tanstack/react-router";
import type { User } from "better-auth";
import { BellIcon, CreditCardIcon, LogOutIcon, MoreVerticalIcon, UserIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

export function UserNav({
	user,
	queryClient
}: {
	user: User;
	queryClient: QueryClient;
}) {
	const { isMobile } = useSidebar();
	const router = useRouter();

	if (!user) {
		redirect({ to: "/login" });
	}
	return (
		<SidebarMenu className="px-2">
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg grayscale">
								<AvatarImage src={user.image ?? ""} alt={user.name} />
								<AvatarFallback className="rounded-lg">
									{user.name.slice(0, 2).toLocaleUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="truncate text-xs text-muted-foreground">{user.email}</span>
							</div>
							<MoreVerticalIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.image ?? ""} alt={user.name} />
									<AvatarFallback className="rounded-lg">
										{user.name.slice(0, 2).toLocaleUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs text-muted-foreground">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<UserIcon />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCardIcon />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<BellIcon />
								Notifications
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
							<LogOutIcon />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
