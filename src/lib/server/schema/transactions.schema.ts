import { decimal, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["failed", "processing", "completed"]);

export const transactions = pgTable("transactions", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull(),
	amount: decimal("amount", {
		precision: 10,
		scale: 2
	}).notNull(),
	currency: text("currency").notNull().default("USD"),
	activity: text("activity").notNull(),
	status: statusEnum("status").notNull(),
	date: timestamp("date", { withTimezone: true }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date())
});
