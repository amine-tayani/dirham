import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
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
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2 px-2 ">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title} className="py-0.5">
							<SidebarMenuButton tooltip={item.title}>
								{item.icon && <item.icon className="mr-1" />}
								<span className="text-base font-medium">{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
