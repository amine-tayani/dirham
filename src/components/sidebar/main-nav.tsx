import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export function MainNav({
	items
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) {
	const pathname = useLocation({
		select: (location) => location.pathname
	});
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="px-3 uppercase font-mont text-[11px]">
				Main Menu
			</SidebarGroupLabel>
			<SidebarGroupContent className="px-2">
				<SidebarMenu className="gap-2">
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title} asChild isActive={item.url === pathname}>
								<Link to={item.url}>
									{item.icon && <item.icon className="mr-1.5 stroke-2" />}
									{item.title}
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
