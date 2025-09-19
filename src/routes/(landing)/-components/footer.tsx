import Logo from "@/components/blocks/logo";
import { ThemeSwitcher } from "@/components/ui/theme-switch";
import { Link } from "@tanstack/react-router";

const links = [
	{
		group: "Features",
		items: [
			{
				title: "Plan",
				href: "#"
			},
			{
				title: "Build",
				href: "#"
			},
			{
				title: "Insights",
				href: "#"
			},
			{
				title: "Customer",
				href: "#"
			},
			{
				title: "Dirhamly Asks",
				href: "#"
			},
			{
				title: "Security",
				href: "#"
			}
		]
	},
	{
		group: "Product",
		items: [
			{
				title: "Pricing",
				href: "#"
			},
			{
				title: "Method",
				href: "#"
			},
			{
				title: "Integrations",
				href: "#"
			},
			{
				title: "Changelog",
				href: "#"
			},
			{
				title: "Documentation",
				href: "#"
			},
			{
				title: "Download",
				href: "#"
			}
		]
	},
	{
		group: "Company",
		items: [
			{
				title: "About",
				href: "#"
			},
			{
				title: "Careers",
				href: "#"
			},
			{
				title: "Blog",
				href: "#"
			},
			{
				title: "Press",
				href: "#"
			},
			{
				title: "Contact",
				href: "#"
			},
			{
				title: "Help",
				href: "#"
			}
		]
	},
	{
		group: "Ressources",
		items: [
			{
				title: "Developers",
				href: "#"
			},
			{
				title: "Status",
				href: "#"
			},
			{
				title: "Startup",
				href: "#"
			},
			{
				title: "Privacy",
				href: "#"
			},
			{
				title: "Terms",
				href: "#"
			}
		]
	},
	{
		group: "Connect",
		items: [
			{
				title: "Contact us",
				href: "#"
			},
			{
				title: "Community",
				href: "#"
			},
			{
				title: "X (Twitter)",
				href: "#"
			},
			{
				title: "GitHub",
				href: "#"
			},
			{
				title: "Discord",
				href: "#"
			}
		]
	}
];

export default function Footer() {
	return (
		<footer className="border-b bg-white pt-20 dark:bg-transparent">
			<div className="mx-auto max-w-5xl px-6">
				<div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
					<div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-6 md:col-span-3 md:row-start-1 lg:col-span-6">
						<div className="-mt-3">
							<Link to="/">
								<Logo />
							</Link>
						</div>
						{links.map((link, index) => (
							<div key={index} className="space-y-4">
								<span className="block text-[0.825rem] font-medium pb-6">{link.group}</span>
								{link.items.map((item, index) => (
									<Link
										key={index}
										to={item.href}
										className="text-muted-foreground/70 hover:text-foreground text-[0.805rem] block duration-150"
									>
										<span>{item.title}</span>
									</Link>
								))}
							</div>
						))}
					</div>
				</div>
				<div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
					<ThemeSwitcher />
					<small className="text-muted-foreground order-last block text-center text-sm md:order-first">
						© {new Date().getFullYear()} Dirhamly, All rights reserved
					</small>
				</div>
			</div>
		</footer>
	);
}
