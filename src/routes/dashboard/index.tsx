import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCardIcon,
  HomeIcon,
  LucideCalendar,
  LucideLayers3,
  MapIcon,
  PieChartIcon,
  TargetIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { MainNav } from "@/components/sidebar/main-nav";
import { SupportNav } from "@/components/sidebar/support-nav";
import { UserNav } from "@/components/user-nav";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

const data = {
  user: {
    name: "John Doe",
    email: "john@doe.com",
    avatar: "https://avatars.githubusercontent.com/u/234324?v=4",
  },
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

function DashboardIndex() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                variant="ghost"
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <Link to="/" className="mx-2 mt-4">
                  <img src="/dirhamly.png" alt="Dirhamly" className="h-8 w-8" />
                  <span className="font-bold tracking-wide text-lg ml-0.5">
                    Dirhamly
                  </span>
                </Link>
              </SidebarMenuButton>
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
    </SidebarProvider>
  );
}
