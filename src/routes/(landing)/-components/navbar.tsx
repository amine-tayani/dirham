import Logo from "@/components/logo";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Loader2Icon, MenuIcon, MoonIcon, XIcon } from "lucide-react";
import * as React from "react";

const menuItems = [
	{ name: "Product", href: "/" },
	{ name: "Resources", href: "/" },
	{ name: "Pricing", href: "/" },
	{ name: "Customers", href: "/" },
	{ name: "Contact", href: "/" }
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const { data: session, isPending } = authClient.useSession();
	const { theme, setCurrentTheme } = useTheme();

	React.useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className="fixed top-0 z-50 w-full">
			<nav
				data-state={menuOpen ? "active" : ""}
				className={cn(
					"transition-all duration-300",
					isScrolled ? "backdrop-blur-md bg-background/70 border-b" : "bg-transparent"
				)}
			>
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 lg:px-12">
					{/* Left: Logo */}
					<Link to="/" aria-label="Logo" className="flex items-center gap-2">
						<Logo />
						<span className=" font-semibold tracking-tight">Dirhamly</span>
					</Link>

					{/* Center: Nav links (desktop) */}
					<ul className="hidden lg:flex gap-8 text-sm font-medium">
						{menuItems.map((item) => (
							<li key={item.name}>
								<Link
									to={item.href}
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>

					{/* Right: Auth / Theme / Mobile menu */}
					<div className="flex items-center gap-3">
						{isPending ? (
							<Loader2Icon className="size-4 animate-spin" />
						) : !session ? (
							<>
								<Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex">
									<Link to="/login">Login</Link>
								</Button>
								<Button asChild size="sm" className="hidden lg:inline-flex">
									<Link to="/signup">Sign Up</Link>
								</Button>
								<Button asChild size="sm" className="lg:hidden">
									<Link to="/signup">Get Started</Link>
								</Button>
							</>
						) : (
							<Button size="sm" asChild>
								<Link to="/dashboard">Dashboard</Link>
							</Button>
						)}

						{/* Theme toggle */}
						<Button
							size="icon"
							variant="ghost"
							onClick={() => setCurrentTheme(theme === "dark" ? "light" : "dark")}
						>
							<MoonIcon className="size-4" />
						</Button>

						{/* Mobile menu toggle */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setMenuOpen(!menuOpen)}
							className="lg:hidden"
						>
							{menuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
						</Button>
					</div>
				</div>

				{/* Mobile menu */}
				{menuOpen && (
					<div className="lg:hidden border-t bg-background/90 backdrop-blur-md px-6 py-6">
						<ul className="flex flex-col gap-6 text-base font-medium">
							{menuItems.map((item) => (
								<li key={item.name}>
									<Link
										to={item.href}
										className="block text-muted-foreground hover:text-foreground transition-colors"
										onClick={() => setMenuOpen(false)}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</nav>
		</header>
	);
}
