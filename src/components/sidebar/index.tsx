import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenuItem,
	useSidebar
} from "@/components/ui/sidebar";
import type { QueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { User } from "better-auth";
import {
	ArrowLeftRightIcon,
	BellIcon,
	CalendarDaysIcon,
	ClipboardIcon,
	EclipseIcon,
	HomeIcon,
	LifeBuoy,
	SettingsIcon,
	SidebarIcon,
	WalletCardsIcon
} from "lucide-react";
import type React from "react";
import Logo from "../logo";
import { MainNav } from "./main-nav";
import { SupportNav } from "./support-nav";

const data = {
	mainNavigation: [
		{
			title: "Home",
			url: "/dashboard",
			icon: HomeIcon
		},
		{
			title: "Accounts",
			url: "/dashboard/accounts",
			icon: WalletCardsIcon
		},
		{
			title: "Transactions",
			url: "/dashboard/transactions",
			icon: ArrowLeftRightIcon
		},
		{
			title: "Spending Plan",
			url: "/dashboard/spending",
			icon: EclipseIcon
		},
		{
			title: "Upcomings",
			url: "/dashboard/upcomings",
			icon: CalendarDaysIcon
		},
		{
			title: "Reports",
			url: "/dashboard/reports",
			icon: ClipboardIcon
		}
	],
	supportNav: [
		{
			title: "Notifications",
			url: "/dashboard/notifications",
			icon: BellIcon
		},
		{
			title: "Ai Assistant",
			url: "/dashboard/assistant",
			icon: LifeBuoy
		},
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: SettingsIcon
		}
	]
};

interface Props extends React.ComponentProps<typeof Sidebar> {
	user: User;
	queryClient: QueryClient;
}

export function DashboardSidebar({ user, queryClient, ...props }: Props) {
	const { toggleSidebar } = useSidebar();
	return (
		<Sidebar collapsible="icon" {...props} className="group-data-[side=left]:border-none">
			<SidebarHeader>
				<SidebarMenuItem>
					<div className="flex items-center justify-between">
						<Link to="/" className="flex items-center group-data-[collapsible=icon]:hidden">
							<Logo />
							<span className="mr-2 font-geist font-semibold text-card-foreground dark:text-primary-foreground">
								Dirhamly
							</span>
						</Link>

						<div className="flex mx-auto mt-4 mr-3 not-group-data-[collapsible=icon]:mt-0 not-group-data-[collapsible=icon]:mr-0">
							<Button size="icon" variant="ghost" onClick={toggleSidebar}>
								<SidebarIcon className="size-4.5" />
							</Button>
						</div>
					</div>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				<MainNav items={data.mainNavigation} />
				<SupportNav items={data.supportNav} />
			</SidebarContent>
		</Sidebar>
	);
}
