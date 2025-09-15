import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const transitionVariants = {
	item: {
		hidden: {
			opacity: 0,
			filter: "blur(12px)",
			y: 12
		},
		visible: {
			opacity: 1,
			filter: "blur(0px)",
			y: 0,
			transition: {
				type: "spring" as const,
				bounce: 0.3,
				duration: 1.5
			}
		}
	}
};

export default function Hero() {
	return (
		<main className="overflow-hidden">
			<div
				aria-hidden
				className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
			>
				<div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
				<div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
				<div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
			</div>
			<section>
				<div className="relative pt-24 md:pt-36">
					<div
						aria-hidden
						className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
					/>
					<div className="mx-auto max-w-7xl px-6">
						<div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
							<AnimatedGroup variants={transitionVariants}>
								<Link
									to="/dashboard"
									className="dark:hover:bg-neutral-800 hover:bg-neutral-200 dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
								>
									<span className="text-foreground text-sm">
										Introducing The Next Generation of Personal Budgeting Apps
									</span>

									<div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
										<div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
											<span className="flex size-6">
												<ArrowRight className="m-auto size-3" />
											</span>
											<span className="flex size-6">
												<ArrowRight className="m-auto size-3" />
											</span>
										</div>
									</div>
								</Link>

								<h1 className="mt-8 max-w-4xl font-geist font-semibold mx-auto text-balance text-6xl md:text-7xl lg:mt-12 xl:text-[5.25rem]">
									Dirhamly Your Personal Budgeting App
								</h1>
								<p className="mx-auto mt-8 max-w-2xl text-balance text-lg font-geist">
									Offering everything from smart expense tracking to savings goal planning, all
									wrapped in an elegant interface with real-time guidance from AI
								</p>
							</AnimatedGroup>

							<AnimatedGroup
								variants={{
									container: {
										visible: {
											transition: {
												staggerChildren: 0.05,
												delayChildren: 0.75
											}
										}
									},
									...transitionVariants
								}}
								className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
							>
								<Button asChild size="lg">
									<Link to="/signup">
										<span className="text-nowrap font-semibold text-white">Start Building</span>
									</Link>
								</Button>
								<Button asChild size="lg" variant="ghost">
									<Link to="/signup">
										<span className="text-nowrap">Request a demo</span>
									</Link>
								</Button>
							</AnimatedGroup>
						</div>
					</div>
				</div>
			</section>
			{/* we can move this section to a separate file */}
		</main>
	);
}
