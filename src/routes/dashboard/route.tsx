import { UserNav } from "@/components/blocks/user-nav";
import { DashboardSidebar } from "@/components/sidebar";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { greetUser } from "@/lib/utils";
import { Outlet, createFileRoute, redirect, useMatches } from "@tanstack/react-router";
import type { User } from "better-auth";
import { MoonIcon } from "lucide-react";

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
	const matches = useMatches();
	const { theme, setCurrentTheme } = useTheme();

	const currentMatch = matches[matches.length - 1];
	const currentRoute = currentMatch?.routeId || "";

	const getHeaderTitle = () => {
		const contextWithTitle = currentMatch?.context as any;

		if (contextWithTitle?.title) {
			return contextWithTitle.title;
		}

		if (currentRoute === "/dashboard/") {
			return `${greetUser()} ${user?.name}`;
		}

		const routeParts = currentRoute.split("/");
		const pageName = routeParts[routeParts.length - 1];

		if (pageName && pageName !== "dashboard") {
			return pageName.charAt(0).toUpperCase() + pageName.slice(1);
		}

		return "Dashboard";
	};

	return (
		<SidebarProvider>
			<DashboardSidebar user={user} queryClient={queryClient} />
			<div className="pt-5 px-5 w-full bg-muted">
				<SidebarInset className="overflow-hidden rounded-2xl">
					<>
						<header className="flex h-20 shrink-0 items-center gap-2 border-b pt-2 mb-4">
							<div className="flex flex-1 items-center gap-2">
								<div className="flex items-center justify-between gap-4 pl-7">
									<h1 className="text-2xl font-medium tracking-tight"> {getHeaderTitle()}</h1>
								</div>
							</div>
							<div className="flex gap-4 ml-auto pr-7">
								<Button
									size="icon"
									variant="ghost"
									onClick={() => setCurrentTheme(theme === "dark" ? "light" : "dark")}
									aria-label="Toggle theme"
								>
									<MoonIcon className="m-auto size-5 text-neutral-600 dark:text-neutral-400" />
								</Button>
								<UserNav user={user} queryClient={queryClient} />
							</div>
						</header>
						<Outlet />
					</>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
