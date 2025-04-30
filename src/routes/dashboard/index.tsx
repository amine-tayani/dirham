import { DashboardSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { User } from "better-auth";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
  loader: ({ context }) => {
    return { user: context.user as User };
  },
});

function DashboardIndex() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();
  return (
    <SidebarProvider>
      <DashboardSidebar variant="inset" user={user} queryClient={queryClient} />
      <SidebarInset>
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">Documents</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">Cards</div>
              <div className="px-4 lg:px-6">Chart Area</div>
              <div className="px-4 lg:px-6">Tables</div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
