import { pgTable, integer, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { books } from "./books";
import { relations } from "drizzle-orm";

export const histories = pgTable("histories", {
  user_id: integer("user_id").notNull().references(() => users.id),
  book_id: integer("book_id").notNull().references(() => books.id),
  quantity: integer("quantity").notNull().default(1),
}, (table) => {
  return {
    primaryKey: primaryKey({ columns: [table.user_id, table.book_id] }),
    userFk: foreignKey({ columns: [table.user_id], foreignColumns: [users.id] }),
    bookFk: foreignKey({ columns: [table.book_id], foreignColumns: [books.id] })
  }
});
export type newHistory = typeof histories.$inferInsert;

export const historiesRelations = relations(histories, ({ one }) => ({
  user: one(users, {
    fields: [histories.user_id],
    references: [users.id]
  }),
  book: one(books, {
    fields: [histories.book_id],
    references: [books.id]
  })
}))
