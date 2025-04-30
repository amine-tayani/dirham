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
  CreditCardIcon,
  HomeIcon,
  LucideCalendar,
  LucideLayers3,
  MapIcon,
  PieChartIcon,
  TargetIcon,
} from "lucide-react";
import { MainNav } from "./main-nav";
import { SupportNav } from "./support-nav";
import { UserNav } from "../user-nav";
import { User } from "better-auth";
import { QueryClient } from "@tanstack/react-query";

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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" className="mx-2 mt-4 flex items-center gap-2">
              <img
                src="/dirhamly.png"
                alt="Dirhamly"
                className="h-8 w-8 shrink-0 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6"
              />
              <span className="font-bold tracking-wide text-lg ml-0.5 group-data-[collapsible=icon]:hidden">
                Dirhamly
              </span>
            </Link>
          </SidebarMenuItem>
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
