import AddAccountCommandButton from "@/components/add-account-button";
import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { LayersIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/accounts")({
	component: AccountsPage
});

function AccountsPage() {
	return (
		<div className="flex flex-1 flex-col gap-4 lg:gap-6 mx-7 mt-4 mb-7">
			{/* Empty placeholder when user has no accounts */}
			<div className="flex mx-auto flex-col justify-center items-center h-[calc(100vh-180px)]">
				<Card className=" px-10 py-20 min-w-[600px] max-w-[700px] shadow-none">
					<div className="text-center">
						<div className="size-10 rounded-lg bg-neutral-200 dark:bg-muted flex items-center justify-center mx-auto mb-4">
							<LayersIcon className="size-6 text-muted-foreground/70 dark:text-muted-foreground" />
						</div>
						<h3 className="text-lg font-medium mb-2">No accounts yet</h3>
						<p className="text-muted-foreground mb-6">Add accounts to display net worth data</p>
						<AddAccountCommandButton />
					</div>
				</Card>
			</div>
			{/* end of empty placeholder */}
		</div>
	);
}
