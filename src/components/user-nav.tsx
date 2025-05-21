import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import authClient from "@/lib/auth-client";
import { toggleTheme } from "@/utils/toggle-theme";
import type { QueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { User } from "better-auth";
import {
	CreditCardIcon,
	LogOutIcon,
	MoonIcon,
	SettingsIcon,
	ShieldIcon,
	UserIcon
} from "lucide-react";
import { useId, useState } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export function UserNav({
	user,
	queryClient
}: {
	user: User;
	queryClient: QueryClient;
}) {
	const id = useId();
	const [checked, setChecked] = useState<boolean>(false);
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<img
					src="https://i.pravatar.cc/150?img=3"
					alt="Avatar"
					width={32}
					height={32}
					className="shrink-0 rounded-full"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="max-w-64 rounded-xl p-2 shadow-none"
				sideOffset={6}
				align="end"
			>
				<DropdownMenuLabel className="flex items-start gap-3">
					<img
						src="https://i.pravatar.cc/150?img=3"
						alt="Avatar"
						width={32}
						height={32}
						className="shrink-0 rounded-full"
					/>
					<div className="flex min-w-0 flex-col">
						<span className="text-foreground truncate text-sm font-medium">{user.name}</span>
						<span className="text-muted-foreground truncate text-xs font-normal">{user.email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Profile</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShieldIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Account</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCardIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Billing</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<SettingsIcon size={16} className="opacity-60" aria-hidden="true" />
						<span>Settings</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<DropdownMenuItem className="flex items-center justify-between w-full p-0">
							<div className="flex items-center">
								<MoonIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
								Dark mode
							</div>
							<div>
								<Switch
									onChange={() => {
										toggleTheme();
										setChecked(!checked);
									}}
									checked={checked}
									id={id}
									className="data-[state=unchecked]:border-input data-[state=unchecked]:[&_span]:bg-input data-[state=unchecked]:bg-transparent [&_span]:transition-all data-[state=unchecked]:[&_span]:size-4 data-[state=unchecked]:[&_span]:translate-x-0.5 data-[state=unchecked]:[&_span]:shadow-none data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5"
								/>
								<Label htmlFor={id} className="sr-only">
									dark theme switch
								</Label>
							</div>
						</DropdownMenuItem>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<LogOutIcon
						onClick={async () => {
							await queryClient.invalidateQueries({ queryKey: ["user"] });
							await authClient.signOut();
							await router.invalidate();
						}}
						size={16}
						className="opacity-60"
						aria-hidden="true"
					/>
					<span>Logout</span>
				</DropdownMenuItem>

				{/* <DropdownMenuItem className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<MoonIcon className="size-5" />
							Dark mode
						</div>
						<div className="inline-flex items-center gap-2">
							<Switch
								checked={checked}
								id={id}
								className="data-[state=unchecked]:border-input data-[state=unchecked]:[&_span]:bg-input data-[state=unchecked]:bg-transparent [&_span]:transition-all data-[state=unchecked]:[&_span]:size-4 data-[state=unchecked]:[&_span]:translate-x-0.5 data-[state=unchecked]:[&_span]:shadow-none data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5"
							/>
							<Label htmlFor={id} className="sr-only">
								dark theme switch
							</Label>
						</div>
					</DropdownMenuItem> */}

				{/* <DropdownMenuItem
					className="text-destructive dark:text-red-400"
					onClick={async () => {
						await queryClient.invalidateQueries({ queryKey: ["user"] });
						await authClient.signOut();
						await router.invalidate();
					}}
				>
					<LogOutIcon className="size-5 text-destructive dark:text-red-400" />
					Sign Out
				</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
