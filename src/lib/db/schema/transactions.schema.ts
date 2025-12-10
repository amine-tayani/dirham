import { init } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { numeric, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import * as z from "zod";
import { user as userSchema } from "./auth.schema";

export const statusEnum = pgEnum("status", ["failed", "processing", "completed"]);

export const statusValues = statusEnum.enumValues as string[];

const cuid = init({ length: 8 });

export const transactions = pgTable("transactions", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => cuid()),
	userId: text("user_id")
		.notNull()
		.references(() => userSchema.id, { onDelete: "cascade" }),
	amount: numeric("amount").notNull(),
	currency: text("currency").notNull().default("USD"),
	description: text("description").notNull(),
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
	date: z.coerce.date()
});

export const transactionFormSchema = insertTransactionSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	userId: true
});

export const updateTransactionSchema = createUpdateSchema(transactions);
