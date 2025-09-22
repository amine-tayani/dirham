import Logo from "@/components/blocks/logo";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { EqualIcon, Loader2Icon, XIcon } from "lucide-react";
import * as React from "react";

const menuItems = [
	{ name: "Features", href: "/" },
	{ name: "Integrations", href: "/" },
	{ name: "Pricing", href: "/" },
	{ name: "Changelog", href: "/" },
	{ name: "Documentation", href: "/" }
];

const ressourcesItems = [
	{ name: "About", href: "/" },
	{ name: "Customers", href: "/" },
	{ name: "Contact", href: "/" },
	{ name: "Careers", href: "/" },
	{ name: "Now", href: "/" }
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const { data: session, isPending } = authClient.useSession();

	React.useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className="fixed top-0 z-50 w-full border-b border-muted-foreground/10">
			<nav
				data-state={menuOpen ? "active" : ""}
				className={cn(
					"transition-all duration-300",
					isScrolled ? "backdrop-blur-md bg-background/70" : "bg-transparent"
				)}
			>
				<div className="mx-auto flex max-w-6xl items-center justify-between px-3 md:px-6 py-3 lg:px-20">
					<Link to="/" aria-label="Logo" className="flex items-center">
						<Logo />
						<span className=" font-semibold tracking-tight">Dirhamly</span>
					</Link>

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

					<div className="flex items-center gap-3">
						{isPending ? (
							<Loader2Icon className="size-4 animate-spin" />
						) : !session ? (
							<>
								<Button asChild variant="ghost" size="sm" className="inline-flex">
									<Link to="/login" className="text-muted-foreground">
										Log in
									</Link>
								</Button>
								<Button variant="milk" asChild size="sm" className="inline-flex">
									<Link to="/signup">Sign Up</Link>
								</Button>
							</>
						) : (
							<Button variant="milk" size="sm" asChild>
								<Link to="/dashboard">Dashboard</Link>
							</Button>
						)}

						<Button
							variant="ghost"
							size="icon"
							onClick={() => setMenuOpen(!menuOpen)}
							className="lg:hidden"
						>
							{menuOpen ? <XIcon className="size-5" /> : <EqualIcon className="size-6" />}
						</Button>
					</div>
				</div>

				{menuOpen && (
					<motion.div
						key={menuOpen ? "open" : "close"}
						initial={{ opacity: 0 }}
						onClickCapture={() => setMenuOpen(false)}
						animate={{ opacity: 1 }}
						className="lg:hidden border-t bg-background/90 backdrop-blur-md min-h-dvh px-6 py-6"
					>
						<div className="h-2.5" />
						<span className="text-muted-foreground text-sm font-medium">Product</span>
						<div className="h-4" />
						<ul className="flex flex-col gap-3 [&>li>a]:text-neutral-50 [&>li>a]:text-2xl [&>li>a]:tracking-tighter [&>li>a]:font-medium">
							{menuItems.map((item) => (
								<li key={item.name}>
									<Link to={item.href} onClick={() => setMenuOpen(false)}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
						<div className="h-8" />
						<span className="text-muted-foreground text-sm font-medium">Ressources</span>
						<div className="h-4" />
						<ul className="flex flex-col gap-3 [&>li>a]:text-neutral-50 [&>li>a]:text-2xl [&>li>a]:tracking-tighter [&>li>a]:font-medium">
							{ressourcesItems.map((item) => (
								<li key={item.name}>
									<Link to={item.href} onClick={() => setMenuOpen(false)}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</nav>
		</header>
	);
}
