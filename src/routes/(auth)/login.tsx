import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/login")({
	component: LoginPage
});

function LoginPage() {
	const navigate = useNavigate();
	const { redirectUrl, queryClient } = Route.useRouteContext();
	const [isLoading, setIsLoading] = useState(false);

	const loginSchema = z.object({
		email: z
			.string()
			.min(1, { message: "Email is required" })
			.email({ message: "The email you entered is invalid" }),
		password: z.string().min(8, { message: "Password must be at least 8 characters long" })
	});

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
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
		<div className="flex flex-col gap-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onLoginSubmit)} className="flex flex-col gap-6">
					<div className="flex flex-col gap-6">
						<h1 className="text-center text-3xl font-geist font-bold ">Log in to Dirhamly</h1>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="email"
											className="h-12 border border-border shadow-none dark:border-none"
											placeholder="example@gmail.com"
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
											className="h-12 border border-border shadow-none dark:border-none"
											placeholder="Your password"
											readOnly={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

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
					<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
						<span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
					</div>
					<div>
						<Button
							variant="outline"
							className="w-full h-12 border font-semibold dark:border-none"
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
							<img src="google-icon.svg" alt="Google" className="size-6 mr-2" />
							Login with Google
						</Button>
					</div>
				</form>
			</Form>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/signup" className="text-primary hover:text-primary/80">
					Sign up
				</Link>
			</div>
		</div>
	);
}
