import { HeroSection } from "@/routes/(landing)/-components/hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
	component: Home
});

function Home() {
	return <HeroSection />;
}
