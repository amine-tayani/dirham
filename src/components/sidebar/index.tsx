import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { toggleTheme } from "@/utils/toggle-theme";
import type { QueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { User } from "better-auth";
import {
	BellIcon,
	CreditCardIcon,
	HomeIcon,
	LayoutIcon,
	LucideCalendar,
	LucideLayers3,
	MapIcon,
	MoonIcon,
	PieChartIcon,
	SearchIcon,
	TargetIcon
} from "lucide-react";
import type React from "react";
import { MainNav } from "./main-nav";
import { SupportNav } from "./support-nav";

const data = {
	mainNavigation: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutIcon
		},
		{
			title: "Accounts",
			url: "#",
			icon: LucideLayers3
		},
		{
			title: "Transactions",
			url: "#",
			icon: CreditCardIcon
		},
		{
			title: "Budget",
			url: "#",
			icon: MapIcon
		},
		{
			title: "Reports",
			url: "#",
			icon: PieChartIcon
		},
		{
			title: "Recurring",
			url: "#",
			icon: LucideCalendar
		},
		{
			title: "Goals",
			url: "#",
			icon: TargetIcon
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
				<SidebarMenu>
					<div className="flex items-center justify-between mx-2 my-2">
						<Link to="/">
							<HomeIcon />
						</Link>
						<div className="flex items-center gap-4 group-data-[collapsible=icon]:hidden">
							<SidebarMenuItem>
								<SearchIcon className="size-5" />
							</SidebarMenuItem>
							<SidebarMenuItem>
								<BellIcon className="size-5" />
							</SidebarMenuItem>
							<SidebarMenuItem onClick={toggleTheme}>
								<MoonIcon className="size-5" />
							</SidebarMenuItem>
						</div>
					</div>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<MainNav items={data.mainNavigation} />
				<SupportNav className="mt-auto" />
			</SidebarContent>
		</Sidebar>
	);
}
