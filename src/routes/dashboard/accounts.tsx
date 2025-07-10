import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/accounts")({
	component: AccountsIndex
});

function AccountsIndex() {
	// const { user } = Route.useLoaderData();
	const { queryClient } = Route.useRouteContext();
	return (
		<>
			<header className="flex h-20 shrink-0 items-center gap-2 border-b pt-2 mb-4">
				<div className="flex flex-1 items-center gap-2">
					<div className="flex items-center justify-between gap-4 pl-7">
						<h1 className="text-2xl font-medium tracking-tight">Accounts</h1>
					</div>
				</div>
				<div className="flex ml-auto pr-7">
					USer
					{/* <UserNav user={user} queryClient={queryClient} /> */}
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 lg:gap-6 mt-4 mx-7 mb-4">hello</div>
		</>
	);
}
