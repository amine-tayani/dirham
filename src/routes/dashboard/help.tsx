import { AiAssistant } from "@/components/dashboard/ai-assistant";
import { UserNav } from "@/components/user-nav";
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
	const { queryClient } = Route.useRouteContext();
	return (
		<>
			<header className="flex h-20 shrink-0 items-center gap-2 border-b pt-2 mb-4">
				<div className="flex flex-1 items-center gap-2">
					<div className="flex items-center justify-between gap-4 pl-7">
						<h1 className="text-2xl font-medium tracking-tight">AI Assistant</h1>
					</div>
				</div>
				<div className="flex ml-auto pr-7">
					<UserNav user={user} queryClient={queryClient} />
				</div>
			</header>
			<div className=" flex-col gap-4 lg:gap-6 mt-4 mx-7 mb-4">
				<AiAssistant />
			</div>
		</>
	);
}
