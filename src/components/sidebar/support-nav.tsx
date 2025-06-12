import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { BellIcon, LifeBuoy, SettingsIcon } from "lucide-react";

export function SupportNav({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent className="px-2 mb-4">
				<SidebarMenu className="gap-2">
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="#">
								<BellIcon />
								<span>Notifications</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="#">
								<LifeBuoy />
								<span>Help Center</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="#">
								<SettingsIcon />
								<span>Settings</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
