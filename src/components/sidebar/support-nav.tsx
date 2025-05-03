import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { MessageCircleIcon } from "lucide-react";

export function SupportNav({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent className="px-2 ">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="#">
								<MessageCircleIcon />
								<span>Help & Support</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
