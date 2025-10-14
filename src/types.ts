import type { InferSelectModel } from "drizzle-orm";
import type { transactions } from "./lib/db/schema";

export type TransactionItem = Omit<InferSelectModel<typeof transactions>, "userId" | "updated_at">;
