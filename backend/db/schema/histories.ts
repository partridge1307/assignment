import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { books } from "./books";
import { relations } from "drizzle-orm";

export const histories = pgTable("histories", {
  user_id: integer("user_id").notNull().references(() => users.id),
  book_id: integer("book_id").notNull().references(() => books.id),
  quantity: integer("quantity").notNull().default(1),
}, (table) => {
  return {
    primaryKey: primaryKey({ columns: [table.user_id, table.book_id] })
  }
});
export type newHistory = typeof histories.$inferInsert;

export const usersRelations = relations(histories, ({ many }) => ({
  histories: many(histories)
}))
