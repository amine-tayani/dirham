import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className="relative w-full mx-auto max-w-[1350px] px-6 sm:mx-0 sm:px-8 lg:mx-0 xl:mx-28 lg:px-20 pt-20 pb-24">
			<div className="flex flex-col items-start justify-center px-6 sm:px-0 md:px-12 lg:px-26 lg:pt-26 pt-20 pb-24">
				<h1 className="text-4xl sm:text-5xl lg:text-[4.01rem] leading-[1.02] tracking-[-0.021em] text-start font-medium ">
					<span className="sr-only">
						Dirhamly is a purpose-built tool for tracking and managing your finances
					</span>

					<span aria-hidden="true" className="hidden sm:block max-w-4xl leading-[1.17] ">
						Dirhamly is a purpose-built tool for managing your finances
					</span>

					{/* Mobile title */}
					<span
						aria-hidden="true"
						className="block sm:hidden max-w-lg leading-tight text-3xl xs:text-5xl"
					>
						Dirhamly is a purpose-built tool for managing your finances
					</span>
				</h1>

				<div className="h-5" />

				<p className="text-muted-foreground text-lg sm:text-lg lg:text-base  max-w-2xl sm:max-w-lg lg:max-w-sm  ">
					<span className="hidden sm:inline">
						Meet Dirhamly, the tool for keeping your finances <br className="lg:hidden" />
						in check and managing your accounts.
					</span>
					<span className="sm:hidden block text-base max-w-sm ">
						Linear is a purpose-built tool for modern product development. Streamline issues,
						projects, and product roadmaps.
					</span>
				</p>

				<div className="hidden sm:flex items-center gap-4 mt-10">
					<Button asChild variant="milk">
						<a href="/signup">Start building</a>
					</Button>

					<Button
						asChild
						variant="ghost"
						className="gap-1.5 max-w-xs justify-center group not-prose inline-flex items-center pl-2 pr-0.5  transition-colors duration-300 ease-in-out"
					>
						<a href="/">
							<span>New: Product Intelligence</span>
							<svg
								viewBox="0 0 24 24"
								className="size-4 stroke-[3px] fill-none stroke-current opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
							>
								<line
									x1="5"
									y1="12"
									x2="19"
									y2="12"
									className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
								/>
								<polyline
									points="12 5 19 12 12 19"
									className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
								/>
							</svg>
						</a>
					</Button>
				</div>

				{/* Mobile buttons */}
				<div className="sm:hidden flex justify-around items-center gap-4 mt-8">
					<Button asChild variant="secondary" className=" max-w-xs">
						<a href="/login">Start building</a>
					</Button>

					<Button
						asChild
						variant="ghost"
						className="gap-1.5 max-w-xs justify-center group not-prose inline-flex items-center pl-2 pr-0.5  transition-colors duration-300 ease-in-out"
					>
						<a href="/">
							<span>New: Product Intelligence</span>
							<svg
								viewBox="0 0 24 24"
								className="size-5 stroke-[3px] fill-none stroke-current opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
							>
								<line
									x1="5"
									y1="12"
									x2="19"
									y2="12"
									className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
								/>
								<polyline
									points="12 5 19 12 12 19"
									className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
								/>
							</svg>
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
