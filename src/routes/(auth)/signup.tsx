import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/signup")({
	component: SignupForm
});

function SignupForm() {
	const { redirectUrl } = Route.useRouteContext();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const signupSchema = z
		.object({
			name: z.string().min(3, {
				message: "Username must be at least 3 characters long"
			}),
			email: z.string().email({ message: "Invalid email address" }),
			password: z
				.string()
				.min(8, { message: "Password must be at least 8 characters long" })
				.max(255, { message: "Password must be at most 255 characters long" })
				.refine((val) => /[A-Z]/.test(val), {
					message: "Password must contain at least one uppercase letter"
				})
				.refine((val) => /[a-z]/.test(val), {
					message: "Password must contain at least one lowercase letter"
				})
				.refine((val) => /[0-9]/.test(val), {
					message: "Password must contain at least one number"
				})
				.refine((val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), {
					message: "Password must contain at least one special character"
				}),
			confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" })
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"]
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
		setErrorMessage("");
		try {
			await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: values.name
			});
			navigate({ to: redirectUrl || "/dashboard" });
		} catch (err: any) {
			setErrorMessage(err.message || "Signup failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSignupSubmit)} className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						<a href="#" className="flex flex-col items-center gap-2 font-medium">
							<div className="flex items-center justify-center rounded-md">
								<Logo />
							</div>
							<span className="sr-only">Dirhamly</span>
						</a>
						<h1 className="text-xl font-bold">Sign up with Dirhamly</h1>
					</div>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										className="h-12 border border-neutral-700 shadow-none dark:border-none"
										placeholder="John Doe"
										readOnly={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										type="email"
										className="h-12 border border-neutral-700 shadow-none dark:border-none"
										placeholder="hello@example.com"
										readOnly={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										type="password"
										className="h-12 border border-neutral-700 shadow-none dark:border-none"
										placeholder="Password"
										readOnly={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										type="password"
										className="h-12 border border-neutral-700 shadow-none dark:border-none"
										placeholder="Confirm Password"
										readOnly={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{errorMessage && (
						<span className="text-destructive text-center text-sm">{errorMessage}</span>
					)}

					<Button
						type="submit"
						className="group mt-2 h-12 bg-blue-700 hover:bg-blue-800 text-white font-sans font-semibold w-full"
						size="lg"
						disabled={isLoading}
					>
						<div className="flex items-center text-base justify-between w-full">
							{isLoading ? "Signing up..." : "Sign up with Dirhamly"}
							{isLoading ? (
								<LoaderCircle className="animate-spin" />
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="size-6 group-hover:translate-x-2 ease-in-out duration-200"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M5 12l14 0" />
									<path d="M15 16l4 -4" />
									<path d="M15 8l4 4" />
								</svg>
							)}
						</div>
					</Button>

					<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
						<span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
					</div>

					<Button
						variant="outline"
						className="w-full h-12 border-2 text-base font-semibold border-primary"
						type="button"
						disabled={isLoading}
						onClick={() => {
							authClient.signIn.social({
								provider: "google",
								callbackURL: redirectUrl
							});
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 size-5">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor"
							/>
						</svg>
						Sign up with Google
					</Button>
				</form>
			</Form>

			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link to="/login" className="text-blue-600 hover:text-blue-500">
					Login
				</Link>
			</div>
		</div>
	);
}
