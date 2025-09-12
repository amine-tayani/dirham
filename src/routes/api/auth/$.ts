import { auth } from "@/lib/server/auth";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
	GET: async ({ request }) => {
		return auth.handler(request);
	},
	POST: async ({ request }) => {
		return auth.handler(request);
	}
});
