import { DashboardSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,
	beforeLoad: async ({ context }) => {
		if (!context.user) {
			throw redirect({ to: "/login" });
		}
	},
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function DashboardLayout() {
	const { queryClient } = Route.useRouteContext();
	const { user } = Route.useLoaderData();
	return (
		<SidebarProvider>
			<DashboardSidebar user={user} queryClient={queryClient} />
			<div className="pt-5 pr-5 w-full bg-muted">
				<SidebarInset className="overflow-hidden rounded-2xl">
					<Outlet />
				</SidebarInset>
			</div> 	
		</SidebarProvider>
	);
}
