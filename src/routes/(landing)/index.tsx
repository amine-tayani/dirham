import { HeroSection } from "@/routes/(landing)/-components/hero";
import { createFileRoute } from "@tanstack/react-router";
import Navbar from "./-components/navbar";

export const Route = createFileRoute("/(landing)/")({
	component: Home
});

function Home() {
	return (
		<>
			<Navbar />
			<HeroSection />
		</>
	);
}
