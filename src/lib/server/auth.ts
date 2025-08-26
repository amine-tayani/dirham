import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

import { db } from "../db";

export const auth = betterAuth({
	baseURL: process.env.VITE_BASE_URL,
	database: drizzleAdapter(db, {
		provider: "pg"
	}),

	// rateLimit: {
	// 	enabled: true,
	// 	max: 10,
	// 	timeWindow: 10,
	// 	customRules: {
	// 		"/sign-in/email": {
	// 			max: 4,
	// 			window: 4
	// 		}
	// 	}
	// },

	plugins: [reactStartCookies()],

	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60 // 5 minutes
		}
	},

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}
	},

	// https://www.better-auth.com/docs/authentication/email-password
	emailAndPassword: {
		enabled: true
	}
});
