import { AiAssistant } from "@/components/dashboard/ai-assistant";
import { createFileRoute } from "@tanstack/react-router";
import type { User } from "better-auth";

export const Route = createFileRoute("/dashboard/help")({
	component: RouteComponent,
	loader: ({ context }) => {
		return { user: context.user as User };
	}
});

function RouteComponent() {
	const { user } = Route.useLoaderData();
	return (
		<div className=" flex-col gap-4 lg:gap-6 mt-4 mx-7 mb-4">
			<AiAssistant user={user} />
		</div>
	);
}
