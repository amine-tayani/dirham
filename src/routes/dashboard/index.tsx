import { StatsCard } from "@/components/dashboard/stats-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { DashboardSidebar } from "@/components/sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { greetUser } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardIndex,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function DashboardIndex() {
	const { queryClient } = Route.useRouteContext();
	const { user } = Route.useLoaderData();

	return (
		<SidebarProvider>
			<DashboardSidebar user={user} queryClient={queryClient} />
			<SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
				<header className="flex h-16 shrink-0 items-center gap-2 border-b">
					<div className="flex flex-1 items-center gap-2 px-3">
						<SidebarTrigger className="-ms-4" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Home
										<span className="sr-only">Dashboard</span>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Dashboard</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="flex ml-auto">
						<UserNav user={user} queryClient={queryClient} />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
					<div className="flex items-center justify-between gap-4">
						<h1 className="text-2xl font-medium font-mono tracking-tighter">
							{`${greetUser()} ${user.name}`}
						</h1>
					</div>
					<StatsCard />
					<div className="min-h-[100vh] flex-1 md:min-h-min">
						<InteractiveChart />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
