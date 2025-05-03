import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
	baseURL: import.meta.env.BETTER_AUTH_URL as string
});

export default authClient;
