import { date, pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique("unique_username"),
  password: text("password").notNull(),
  created_at: date("created_at", { mode: "string" }).notNull().defaultNow()
}, (table) => {
  return {
    usernameIdx: uniqueIndex("username_idx").on(table.username)
  };
});

export type Users = typeof users.$inferSelect;
