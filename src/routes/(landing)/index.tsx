import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";
import { toggleTheme } from "@/utils/toggle-theme";
import { Link, createFileRoute, useLocation } from "@tanstack/react-router";
import type { User } from "better-auth";
import { MoonIcon } from "lucide-react";

export const Route = createFileRoute("/(landing)/")({
	component: Home,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function Home() {
	const { user } = Route.useLoaderData();
	const { queryClient } = Route.useRouteContext();
	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 shadow-sm py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className=" flex justify-around">
				<div className="container flex h-14 items-center gap-2 md:gap-4">
					<Link to="/" className="mr-4 flex items-center gap-2 lg:mr-6">
						<span className="hidden text-xl font-bold tracking-wide lg:inline-block">Dirhamly</span>
					</Link>
					<MainNavigation />
					<div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
						<UserNav user={user} queryClient={queryClient} />
					</div>
				</div>
			</div>
		</header>
	);
}

export const MainNavigation = () => {
	const { pathname } = useLocation();

	return (
		<div className="hidden md:flex mx-auto justify-center">
			<nav className="flex justify-center items-center gap-4 text-sm xl:gap-6">
				<Link
					to="/dashboard"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname === "/" ? "text-foreground" : "text-foreground/80"
					)}
				>
					Docs
				</Link>
				<Link
					to="/dashboard"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/docs/components") &&
							!pathname?.startsWith("/docs/component/chart")
							? "text-foreground"
							: "text-foreground/80"
					)}
				>
					Components
				</Link>
				<Link
					to="/"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/blocks") ? "text-foreground" : "text-foreground/80"
					)}
				>
					Blocks
				</Link>
				<Link
					to="/dashboard"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/docs/component/chart") || pathname?.startsWith("/charts")
							? "text-foreground"
							: "text-foreground/80"
					)}
				>
					Charts
				</Link>
			</nav>
		</div>
	);
};
