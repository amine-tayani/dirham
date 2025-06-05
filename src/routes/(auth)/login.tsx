import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/login")({
	component: LoginForm
});

function LoginForm() {
	const { redirectUrl, queryClient } = Route.useRouteContext();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLoading) return;

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		if (!email || !password) return;

		setIsLoading(true);
		setErrorMessage("");

		authClient.signIn.email(
			{
				email,
				password,
				callbackURL: redirectUrl
			},
			{
				onError: (ctx) => {
					setErrorMessage(ctx.error.message);
					setIsLoading(false);
				},
				onSuccess: async () => {
					await queryClient.invalidateQueries({ queryKey: ["user"] });
					navigate({ to: redirectUrl });
				}
			}
		);
	};

	return (
		<div className="flex flex-col gap-6 font-geist">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-6">
					<h1 className="text-center text-2xl font-bold ">Log in to Dirhamly</h1>
					<div className="flex flex-col gap-5 mt-4">
						<div className="grid gap-2">
							<Input
								className="h-12 border border-neutral-700 shadow-none dark:border-none"
								name="email"
								type="email"
								placeholder="example@gmail.com"
								readOnly={isLoading}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Input
								className="h-12 border border-neutral-700 shadow-none dark:border-none"
								name="password"
								type="password"
								placeholder="Your password"
								readOnly={isLoading}
								required
							/>
						</div>
						<Button
							type="submit"
							className="group mt-2 h-12 bg-blue-700 hover:bg-blue-800 text-white font-sans font-semibold w-full"
							size="lg"
							disabled={isLoading}
						>
							<div className="flex items-center">
								{isLoading ? (
									<>
										<span>Log in with email</span>
										<LoaderCircle className="animate-spin ml-2" />
									</>
								) : (
									"Log in"
								)}
							</div>
						</Button>
					</div>
					{errorMessage && (
						<span className="text-destructive text-center text-sm">{errorMessage}</span>
					)}
					<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
						<span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
					</div>
					<div>
						<Button
							variant="outline"
							className="w-full h-12 border-2 font-semibold border-primary dark:border-none"
							type="button"
							disabled={isLoading}
							onClick={() =>
								authClient.signIn.social(
									{
										provider: "google",
										callbackURL: redirectUrl
									},
									{
										onRequest: () => {
											setIsLoading(true);
											setErrorMessage("");
										},
										onError: (ctx) => {
											setIsLoading(false);
											setErrorMessage(ctx.error.message);
										}
									}
								)
							}
						>
							<img src="google-icon.svg" alt="Google" className="size-6 mr-2" />
							Login with Google
						</Button>
					</div>
				</div>
			</form>

			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/signup" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</div>
	);
}
