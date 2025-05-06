import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { auth } from "@/lib/server/auth";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
	createRootRoute,
	createRootRouteWithContext
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import type * as React from "react";

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
				title: "Dirhamly Your financial assistant",
				description:
					"Dirhamly is an AI-powered personal budgeting assistant designed to help individuals and families take control of their finances. "
			})
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png"
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
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ScriptOnce>
					{`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
				</ScriptOnce>

				{children}

				<Scripts />
			</body>
		</html>
	);
}
