import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import authClient from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const Route = createFileRoute("/(auth)/login")({
	component: LoginPage
});

function LoginPage() {
	const navigate = useNavigate();
	const { redirectUrl, queryClient } = Route.useRouteContext();
	const [isLoading, setIsLoading] = useState(false);

	const loginSchema = z.object({
		email: z
			.email({
				error: "The email you entered is invalid"
			})
			.min(1, {
				error: "Email is required"
			}),
		password: z.string().min(8, {
			error: "Password must be at least 8 characters long"
		})
	});

	const form = useForm<z.input<typeof loginSchema>, unknown, z.output<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setIsLoading(true);
		try {
			await authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
					callbackURL: redirectUrl
				},
				{
					onError: (ctx) => {
						toast.error(ctx.error.message);
						setIsLoading(false);
					},
					onSuccess: async () => {
						toast.success("You have successfully logged in, redirecting...");
						await queryClient.invalidateQueries({ queryKey: ["user"] });
						navigate({ to: redirectUrl });
					}
				}
			);
			navigate({ to: redirectUrl || "/dashboard" });
		} catch (err: any) {
			toast.error("An error occurred while logging in");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex justify-center ">
			<div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
						Sign in to your account
					</h3>
					<p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link
							to="/signup"
							className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
						>
							Sign up
						</Link>
					</p>
					<div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
						<Button
							variant="outline"
							className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
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
										},
										onError: (ctx) => {
											setIsLoading(false);
											toast.error(ctx.error.message);
										}
									}
								)
							}
						>
							<img src="google-icon.svg" alt="Google" className="size-4 mr-2" />
							Login with Google
						</Button>
					</div>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<Separator className="w-full" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">or</span>
						</div>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
							<div>
								<Label
									htmlFor="email"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Email
								</Label>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													id="email"
													{...field}
													type="email"
													className="mt-2shadow-none"
													placeholder="example@gmail.com"
													readOnly={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div>
								<Label
									htmlFor="password"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Password
								</Label>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													id="password"
													{...field}
													type="password"
													className="mt-2 shadow-none"
													placeholder="Your password"
													readOnly={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button
								variant="dark"
								disabled={isLoading}
								type="submit"
								className="mt-4 w-full py-2 font-medium"
							>
								<div className="flex items-center">
									{isLoading ? (
										<>
											<span>Sign In</span>
											<LoaderCircle className="animate-spin ml-2" />
										</>
									) : (
										"Sign In"
									)}
								</div>
							</Button>
						</form>
					</Form>
					<p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
						Forgot your password?{" "}
						<Link
							to="/"
							className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
						>
							Reset password
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
