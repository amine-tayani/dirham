import { NotFound } from "@/components/blocks/not-found";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { auth } from "@/lib/server/auth";
import { getThemeServerFn } from "@/lib/theme";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";
import type { QueryClient } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import type * as React from "react";
import { Toaster } from "sonner";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
	const { headers } = getWebRequest()!;
	const session = await auth.api.getSession({ headers });

	return session?.user || null;
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	user: Awaited<ReturnType<typeof getUser>>;
}>()({
	beforeLoad: async ({ context }) => {
		const user = await context.queryClient.fetchQuery({
			queryKey: ["user"],
			queryFn: ({ signal }) => getUser({ signal })
		}); // we're using react-query for caching, see router.tsx
		return { user };
	},
	loader: () => getThemeServerFn(),
	head: () => ({
		meta: [
			{
				charSet: "utf-8"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			...seo({
				title: "Dirhamly - AI-powered personal budgeting assistant",
				description:
					"Dirhamly is an AI-powered personal budgeting assistant designed to help individuals and families take control of their finances. "
			})
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon-180x180.png"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png"
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" }
		]
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent
});

function RootComponent() {
	const data = Route.useLoaderData();
	return (
		<ThemeProvider theme={data}>
			<RootDocument>
				<Outlet />
				<Toaster richColors expand position="top-right" />
			</RootDocument>
		</ThemeProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();
	return (
		<html lang="en-US" suppressHydrationWarning className={theme}>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
