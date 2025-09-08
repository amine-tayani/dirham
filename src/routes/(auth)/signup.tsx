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
import { z } from "zod";

export const Route = createFileRoute("/(auth)/signup")({
	component: SignupPage
});

function SignupPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const signupSchema = z
		.object({
			name: z.string().min(3, {
				error: "Username must be at least 3 characters long"
			}),
			email: z.email({
				error: "Invalid email address"
			}),
			password: z
				.string()
				.min(8, {
					error: "Password must be at least 8 characters long"
				})
				.max(255, {
					error: "Password must be at most 255 characters long"
				})
				.refine((val) => /[A-Z]/.test(val), {
					error: "Password must contain at least one uppercase letter"
				})
				.refine((val) => /[a-z]/.test(val), {
					error: "Password must contain at least one lowercase letter"
				})
				.refine((val) => /[0-9]/.test(val), {
					error: "Password must contain at least one number"
				})
				.refine((val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), {
					error: "Password must contain at least one special character"
				}),
			confirmPassword: z.string().min(8, {
				error: "Password must be at least 8 characters long"
			})
		})
		.refine((data) => data.password === data.confirmPassword, {
			path: ["confirmPassword"],
			error: "Passwords do not match"
		});

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
		setIsLoading(true);
		try {
			await authClient.signUp.email(
				{
					email: values.email,
					password: values.password,
					name: values.name
				},
				{
					onSuccess: async () => {
						toast.success("Signup successful. Redirecting...");
						navigate({ to: "/dashboard" });
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
						setIsLoading(false);
					}
				}
			);
		} catch (err: any) {
			toast.error("An error occurred while signing up");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex justify-center ">
			<div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
						Sign up to your account
					</h3>
					<p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
						>
							Login
						</Link>
					</p>
					<div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
						<Button
							variant="outline"
							className="dark:border-none mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
							type="button"
							disabled={isLoading}
							onClick={() =>
								authClient.signIn.social(
									{
										provider: "google",
										callbackURL: "/dashboard"
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
							Sign up with Google
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
						<form onSubmit={form.handleSubmit(onSignupSubmit)} className="mt-6 space-y-4">
							<div>
								<Label
									htmlFor="name"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Name
								</Label>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="name"
													className="mt-2 border border-border shadow-none dark:border-none"
													placeholder="John Doe"
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
													{...field}
													id="email"
													type="email"
													className="mt-2 border border-border shadow-none dark:border-none"
													placeholder="hello@example.com"
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
													{...field}
													id="password"
													type="password"
													className="mt-2 border border-border shadow-none dark:border-none"
													placeholder="Your password"
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
									htmlFor="confirmPassword"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Password
								</Label>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="confirmPassword"
													type="password"
													className="mt-2 border border-border shadow-none dark:border-none"
													placeholder="Confirm Password"
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
											<LoaderCircle className="animate-spin mr-2" />
											<span>Signing up...</span>
										</>
									) : (
										"Sign up"
									)}
								</div>
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
