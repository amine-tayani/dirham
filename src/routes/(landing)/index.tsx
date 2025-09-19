import { createFileRoute } from "@tanstack/react-router";
import BentoSection from "./-components/bento";
import Footer from "./-components/footer";
import Hero from "./-components/hero";
import Navbar from "./-components/navbar";

export const Route = createFileRoute("/(landing)/")({
	component: HomePage
});

function HomePage() {
	return (
		<>
			<Navbar />
			<Hero />
			<BentoSection />
			<Footer />
		</>
	);
}
