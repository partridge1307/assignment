import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { books } from "./books";
import { relations } from "drizzle-orm";

export const carts = pgTable('carts', {
  user_id: integer("user_id").notNull().references(() => users.id),
  book_id: integer("book_id").notNull().references(() => books.id),
  quantity: integer("quantity").notNull().default(1)
}, (table) => {
  return {
    primaryKey: primaryKey({ columns: [table.user_id, table.book_id] })
  };
});
export type newCart = typeof carts.$inferInsert;

export const cartsRelations = relations(carts, ({ one }) => ({
  users: one(users, {
    fields: [carts.user_id],
    references: [users.id]
  }),
  books: one(books, {
    fields: [carts.book_id],
    references: [books.id]
  })
}))
