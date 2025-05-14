import { DashboardSidebar } from "@/components/sidebar";
import { SpendingChart } from "@/components/spending-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";
import { TrendingUpIcon } from "lucide-react";

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
			<DashboardSidebar variant="inset" user={user} queryClient={queryClient} />
			<SidebarInset>
				<header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
					<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
						<SidebarTrigger className={cn("-ml-1")} />
						<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
						<h1 className="text-base font-medium">dashboard</h1>
					</div>
				</header>
				<div>
					<div className="px-12 mt-8">
						<h1 className="text-2xl font-bold">Welcome Back {user.name}</h1>
					</div>
					<div className="flex flex-1 flex-col px-8">
						<div className="@container/main flex flex-1 flex-col gap-2">
							<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
								<div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-7 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
									<div className="flex flex-col gap-3 col-span-3">
										<div className="flex gap-4">
											<Card>
												<CardHeader className="relative">
													<CardDescription>Total Balance</CardDescription>
													<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
														$12,645.00
													</CardTitle>
												</CardHeader>
												<CardFooter className="flex-col items-start gap-1 text-sm">
													<div className="flex gap-2 font-medium">
														<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
															<TrendingUpIcon className="size-3" />
															7.5% than last month
														</Badge>
													</div>
												</CardFooter>
											</Card>
											<Card>
												<CardHeader className="relative">
													<CardDescription>Monthly Income</CardDescription>
													<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
														$2,500.00
													</CardTitle>
												</CardHeader>
												<CardFooter className="flex-col items-start gap-1 text-sm">
													<div className="flex gap-2 font-medium">
														<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
															<TrendingUpIcon className="size-3" />
															2.4% than last month
														</Badge>
													</div>
												</CardFooter>
											</Card>
										</div>
										<div className="flex gap-4">
											<Card>
												<CardHeader className="relative">
													<CardDescription>Monthly Expenses</CardDescription>
													<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
														$1,890.00
													</CardTitle>
												</CardHeader>
												<CardFooter className="flex-col items-start gap-1 text-sm">
													<div className="flex gap-2 font-medium">
														<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
															<TrendingUpIcon className="size-3" />
															1.5% than last month
														</Badge>
													</div>
												</CardFooter>
											</Card>
											<Card>
												<CardHeader className="relative">
													<CardDescription>Spending Limit</CardDescription>
													<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
														$2,100.00
													</CardTitle>
												</CardHeader>
												<CardFooter className="flex-col items-start gap-1 text-sm">
													<div className="flex gap-2 font-medium">
														<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
															<TrendingUpIcon className="size-3" />
															7.5% than last month
														</Badge>
													</div>
												</CardFooter>
											</Card>
										</div>
									</div>
									<div className="w-[500px]">
										<SpendingChart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
