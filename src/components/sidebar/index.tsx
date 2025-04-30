import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BellIcon,
  CreditCardIcon,
  HomeIcon,
  LucideCalendar,
  LucideLayers3,
  MapIcon,
  PanelLeftIcon,
  PieChartIcon,
  SearchIcon,
  SettingsIcon,
  TargetIcon,
} from "lucide-react";
import { MainNav } from "./main-nav";
import { SupportNav } from "./support-nav";
import { UserNav } from "../user-nav";
import { User } from "better-auth";
import { QueryClient } from "@tanstack/react-query";
import { useSidebar } from "@/components/ui/sidebar";

const data = {
  mainNavigation: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Accounts",
      url: "#",
      icon: LucideLayers3,
    },
    {
      title: "Transactions",
      url: "#",
      icon: CreditCardIcon,
    },
    {
      title: "Budget",
      url: "#",
      icon: MapIcon,
    },
    {
      title: "Reports",
      url: "#",
      icon: PieChartIcon,
    },
    {
      title: "Recurring",
      url: "#",
      icon: LucideCalendar,
    },
    {
      title: "Goals",
      url: "#",
      icon: TargetIcon,
    },
  ],
};

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: User;
  queryClient: QueryClient;
}

export function DashboardSidebar({ user, queryClient, ...props }: Props) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center justify-between mx-2">
            <Link to="/">
              <img
                src="/dirhamly.png"
                alt="Dirhamly"
                className="h-8 w-8 shrink-0 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6"
              />
            </Link>
            <div className="flex items-center gap-4 group-data-[collapsible=icon]:hidden">
              <SidebarMenuItem>
                <SearchIcon className="size-5" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <BellIcon className="size-5" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SettingsIcon className="size-5" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleSidebar}>
                  <PanelLeftIcon className="size-5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={data.mainNavigation} />
        <SupportNav className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={user} queryClient={queryClient} />
      </SidebarFooter>
    </Sidebar>
  );
}
