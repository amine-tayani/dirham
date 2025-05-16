import type * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail
} from "@/components/ui/sidebar";

import {
	BarChart4Icon,
	FilesIcon,
	HammerIcon,
	HeadsetIcon,
	LayoutDashboardIcon,
	LayoutIcon,
	LogOutIcon,
	PlugIcon,
	SettingsIcon,
	User2Icon
} from "lucide-react";
import { SearchForm } from "./search-form";

// This is sample data.
const data = {
	teams: [
		{
			name: "InnovaCraft",
			logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png"
		},
		{
			name: "Acme Corp.",
			logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png"
		},
		{
			name: "Evil Corp.",
			logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png"
		}
	],
	navMain: [
		{
			title: "Sections",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "#",
					icon: LayoutDashboardIcon
				},
				{
					title: "Insights",
					url: "#",
					icon: BarChart4Icon
				},
				{
					title: "Contacts",
					url: "#",
					icon: User2Icon,
					isActive: true
				},
				{
					title: "Tools",
					url: "#",
					icon: HammerIcon
				},
				{
					title: "Integration",
					url: "#",
					icon: PlugIcon
				},
				{
					title: "Layouts",
					url: "#",
					icon: LayoutIcon
				},
				{
					title: "Reports",
					url: "#",
					icon: FilesIcon
				}
			]
		},
		{
			title: "Other",
			url: "#",
			items: [
				{
					title: "Settings",
					url: "#",
					icon: SettingsIcon
				},
				{
					title: "Help Center",
					url: "#",
					icon: HeadsetIcon
				}
			]
		}
	]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h1 className="text-xl font-semibold p-2">Dirhamly</h1>
				<SearchForm className="mt-3" />
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel className="uppercase text-muted-foreground/60">
							{item.title}
						</SidebarGroupLabel>
						<SidebarGroupContent className="px-2">
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
											isActive={item.isActive}
										>
											<a href={item.url}>
												{item.icon && (
													<item.icon
														className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
														size={22}
														aria-hidden="true"
													/>
												)}
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<hr className="border-t border-border mx-2 -mt-px" />
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
							<LogOutIcon
								className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
								size={22}
								aria-hidden="true"
							/>
							<span>Sign Out</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
