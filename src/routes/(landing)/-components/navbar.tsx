import Logo from "@/components/logo";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Loader2Icon, MenuIcon, MoonIcon, XIcon } from "lucide-react";
import * as React from "react";

const menuItems = [
	{ name: "Features", href: "/" },
	{ name: "Solution", href: "/" },
	{ name: "Pricing", href: "/" },
	{ name: "About", href: "/" }
];

export default function Navbar() {
	const [menuState, setMenuState] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const { data: session, isPending } = authClient.useSession();
	const { theme, setCurrentTheme } = useTheme();

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<header>
			<nav data-state={menuState && "active"} className="fixed z-20 w-full px-2 group">
				<div
					className={cn(
						"mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
						isScrolled &&
							"bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5 dark:border-none"
					)}
				>
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full justify-between items-center lg:w-auto">
							<Link to="/" aria-label="Logo" className="flex items-center">
								<Logo />
								<span className="text-lg font-bold font-mont tracking-tighter ml-1 ">Dirhamly</span>
							</Link>

							<Button
								variant="ghost"
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState === true ? "Close Menu" : "Open Menu"}
								className="relative z-20 mr-2 rounded-full cursor-pointer size-10 flex items-center justify-center lg:hidden"
							>
								<MenuIcon className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
								<XIcon className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</Button>
						</div>

						<div className="absolute inset-0 m-auto hidden size-fit lg:block">
							<ul className="flex gap-8 text-sm">
								{menuItems.map((item, index) => (
									<li key={item.name}>
										<Link
											to={item.href}
											className="text-muted-foreground hover:text-accent-foreground block duration-150"
										>
											<span>{item.name}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center text-center space-y-5 rounded-xl border p-10 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-8 text-2xl font-medium">
									{menuItems.map((item, index) => (
										<li key={item.name}>
											<Link
												to={item.href}
												className="text-muted-foreground/70 hover:text-accent-foreground block duration-150"
											>
												<span>{item.name}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
							{isPending ? (
								<Loader2Icon className="animate-spin" />
							) : !session ? (
								<div className="hidden md:flex w-full flex-col space-y-3 md:flex-row md:gap-3 md:space-y-0 md:w-fit">
									<Button asChild variant="outline" className={cn(isScrolled && "lg:hidden")}>
										<Link to="/login">
											<span className="dark:text-white font-semibold text-nowrap font-mont">
												Login
											</span>
										</Link>
									</Button>
									<Button asChild className={cn(isScrolled && "lg:hidden")}>
										<Link to="/signup">
											<span className="text-white font-semibold text-nowrap font-mont">
												Sign Up
											</span>
										</Link>
									</Button>
									<Button asChild className={cn(isScrolled ? "lg:inline-flex" : "hidden")}>
										<Link to="/signup">
											<span className="text-white font-semibold text-nowrap font-mont">
												Get Started
											</span>
										</Link>
									</Button>
								</div>
							) : (
								<Button size="sm" asChild className="hidden md:flex font-semibold text-white">
									<Link to="/dashboard">Dashboard</Link>
								</Button>
							)}
							<Button
								size="icon"
								variant="ghost"
								onClick={() => setCurrentTheme(theme === "dark" ? "light" : "dark")}
							>
								<MoonIcon className="m-auto size-5 text-neutral-600 dark:text-neutral-400" />
							</Button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
