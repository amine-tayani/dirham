import { auth } from "@/lib/server/auth";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const AuthMiddleware = createMiddleware({
	type: "function"
}).server(async ({ next }) => {
	const request = getWebRequest();

	if (!request?.headers) {
		throw redirect({ to: "/" });
	}
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		throw redirect({ to: "/login" });
	}

	return next({
		context: { userId: session.user.id }
	});
});
