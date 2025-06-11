import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle, OctagonAlertIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, useSonner } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/signup")({
	component: SignupForm
});

function SignupForm() {
	const { toasts } = useSonner();
	const { redirectUrl } = Route.useRouteContext();
	const navigate = useNavigate();

	if (toasts.length > 4) {
		toasts.forEach((t) => toast.dismiss(t.id));
	}

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
			await authClient.signUp.email(
				{
					email: values.email,
					password: values.password,
					name: values.name
				},
				{
					onSuccess: async () => {
						// here I want to have a custom headless toast as well
						toast.success("Signup successful. Redirecting...");
						navigate({ to: redirectUrl });
					},
					onError: (ctx) => {
						toast.custom((t) => (
							<div className="bg-background text-foreground w-full rounded-lg border px-4 py-3 shadow-lg sm:w-[var(--width)]">
								<div className="flex gap-2">
									<div className="flex grow gap-3">
										<OctagonAlertIcon className="size-6 text-red-500" />
										<div className="flex grow justify-between">
											<p className="text-sm">{ctx.error.message}</p>
											<Button
												variant="ghost"
												className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
												onClick={() => toast.dismiss(t)}
												aria-label="Close banner"
											>
												<XIcon
													size={16}
													className="opacity-60 transition-opacity group-hover:opacity-100"
													aria-hidden="true"
												/>
											</Button>
										</div>
									</div>
								</div>
							</div>
						));
						setIsLoading(false);
					}
				}
			);
		} catch (err: any) {
			setErrorMessage(err.message || "Signup failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6 font-geist">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSignupSubmit)} className="flex flex-col gap-6">
					<h1 className="text-center text-2xl font-bold mb-4">Create your account</h1>
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

					{errorMessage && <span className="text-red-500 text-center text-sm">{errorMessage}</span>}

					<Button
						type="submit"
						className="group mt-2 h-12 bg-blue-700 hover:bg-blue-800 text-white font-sans font-semibold w-full"
						size="lg"
						disabled={isLoading}
					>
						<div className="flex items-center">
							{isLoading ? (
								<>
									<LoaderCircle className="animate-spin mr-2" />
									<span>Signing up...</span>
								</>
							) : (
								"Sign up with Dirhamly"
							)}
						</div>
					</Button>

					<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
						<span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
					</div>

					<Button
						variant="outline"
						className="w-full h-12 border-2 font-semibold border-primary dark:border-none"
						type="button"
						disabled={isLoading}
						onClick={() => {
							authClient.signIn.social({
								provider: "google",
								callbackURL: redirectUrl
							});
						}}
					>
						<img src="google-icon.svg" alt="Google" className="size-6 mr-2" />
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
