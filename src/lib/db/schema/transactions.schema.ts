import { relations } from "drizzle-orm";
import { numeric, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { user as userSchema } from "./auth.schema";

export const statusEnum = pgEnum("status", ["failed", "processing", "completed"]);

export const transactions = pgTable("transactions", {
	id: serial("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userSchema.id, { onDelete: "cascade" }),
	amount: numeric("amount").notNull(),
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

export const userRelations = relations(userSchema, ({ many }) => ({
	transactions: many(transactions)
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
	user: one(userSchema, {
		fields: [transactions.userId],
		references: [userSchema.id]
	})
}));

// create transaction schema using drizzle-zod package

export const insertTransactionSchema = createInsertSchema(transactions, {
	date: z.coerce.date(),
	amount: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number with up to 2 decimal places")
		.transform((val) => Number.parseFloat(val))
});
export const updateTransactionSchema = createUpdateSchema(transactions);
