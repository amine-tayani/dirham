import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Hero() {
	return (
		<section className="relative w-full max-w-[1350px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-24s">
			<div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-26 lg:pt-26 pt-20 pb-24">
				<h1 className="text-4xl sm:text-4xl lg:text-[4.01rem] leading-[1.02] tracking-[-0.021em] text-start font-medium ">
					<span className="sr-only">
						Dirhamly is a purpose-built tool for tracking and managing your finances
					</span>

					<span aria-hidden="true" className="hidden sm:block max-w-4xl leading-[1.17]">
						Dirhamly is a purpose-built tool for managing your finances
					</span>

					{/* Mobile title */}
					<span
						aria-hidden="true"
						className="block sm:hidden max-w-md mx-auto text-center leading-tight"
					>
						Plan and build your product
					</span>
				</h1>

				<div className="h-5" />

				<p className="text-muted-foreground text-lg sm:text-base max-w-2xl lg:max-w-sm  ">
					<span className="hidden sm:inline">
						Meet Dirhamly, the tool for keeping your finances in check and managing your accounts.
					</span>
					<span className="sm:hidden block text-center">
						Linear is a purpose-built tool for modern product development. Streamline issues,
						projects, and product roadmaps.
					</span>
				</p>

				<div className="hidden sm:flex items-center gap-4 mt-10">
					<Button asChild variant="milk">
						<a href="/signup">Start building</a>
					</Button>

					<Button asChild variant="ghost" className="flex items-center group">
						<a href="/">
							<span>New: Product Intelligence</span>
							<ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-1.5 ease-in-out duration-300" />
						</a>
					</Button>
				</div>

				{/* Mobile buttons */}
				<div className="sm:hidden w-full flex flex-col items-center gap-4 mt-4">
					<Button asChild variant="secondary" className="w-full max-w-xs">
						<a href="/login">Start building</a>
					</Button>

					<Button
						asChild
						variant="ghost"
						className="flex items-center gap-1 w-full max-w-xs justify-center"
					>
						<a href="/">
							<span>New: Product Intelligence</span>
							<ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
