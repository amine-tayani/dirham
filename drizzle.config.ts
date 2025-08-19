import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
	path: ".env.local"
});

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("Cannot read environment, probably DATABASE_URL was not setted");
}

export default {
	out: "./drizzle",
	schema: "./src/lib/db/schema/index.ts",
	breakpoints: true,
	verbose: true,
	strict: true,
	dialect: "postgresql",
	casing: "snake_case",
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
} satisfies Config;
