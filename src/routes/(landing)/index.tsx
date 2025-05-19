import { cn } from "@/lib/utils";
import { HeroSection } from "@/routes/(landing)/-components/hero";
import { Link, createFileRoute, useLocation } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/(landing)/")({
	component: Home,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function Home() {
	const { user } = Route.useLoaderData();
	const { queryClient } = Route.useRouteContext();
	return <HeroSection />;
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
