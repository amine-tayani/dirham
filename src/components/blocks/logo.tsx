import { cn } from "@/lib/utils";

type LogoProps = {
	className?: string;
};

export default function Logo({ className }: LogoProps) {
	return (
		<div>
			<img src="/logo.png" alt="logo" className={cn("h-12 w-auto", className)} />
		</div>
	);
}
