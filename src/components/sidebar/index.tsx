import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuItem } from "@/components/ui/sidebar";
import { toggleTheme } from "@/utils/toggle-theme";
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
	MoonIcon,
	SettingsIcon,
	WalletCardsIcon
} from "lucide-react";
import type React from "react";
import Logo from "../logo";
import { Button } from "../ui/button";
import { MainNav } from "./main-nav";
import { SupportNav } from "./support-nav";

const data = {
	mainNavigation: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: HomeIcon
		},
		{
			title: "Accounts",
			url: "#",
			icon: WalletCardsIcon
		},
		{
			title: "Transactions",
			url: "#",
			icon: ArrowLeftRightIcon
		},
		{
			title: "Spending Plan",
			url: "#",
			icon: EclipseIcon
		},
		{
			title: "Upcomings",
			url: "#",
			icon: CalendarDaysIcon
		},
		{
			title: "Reports",
			url: "#",
			icon: ClipboardIcon
		}
	],
	supportNav: [
		{
			title: "Notifications",
			url: "#",
			icon: BellIcon
		},
		{
			title: "Help Center",
			url: "#",
			icon: LifeBuoy
		},
		{
			title: "Settings",
			url: "#",
			icon: SettingsIcon
		}
	]
};

interface Props extends React.ComponentProps<typeof Sidebar> {
	user: User;
	queryClient: QueryClient;
}

export function DashboardSidebar({ user, queryClient, ...props }: Props) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenuItem>
					<div className="flex items-center justify-between mx-2 my-2">
						<Link to="/" className="flex items-center">
							<Logo className="group-data-[collapsible=icon]:size-10" />
							<span className="mr-2 font-geist font-semibold text-card-foreground dark:text-primary-foreground group-data-[collapsible=icon]:hidden">
								Dirhamly
							</span>
						</Link>
						<div className="group-data-[collapsible=icon]:hidden">
							<Button variant="ghost" onClick={toggleTheme}>
								<MoonIcon className="size-5" />
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
