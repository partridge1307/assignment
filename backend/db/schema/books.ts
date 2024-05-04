import { relations } from "drizzle-orm";
import { pgTable, serial, text, doublePrecision, boolean, date, uniqueIndex, foreignKey, integer } from "drizzle-orm/pg-core";
import { carts } from "./carts";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  cover: text("cover").notNull(),
  name: text("name").notNull().unique(),
  author_id: serial("author_id").notNull(),
  description: text("description").notNull(),
  pages: integer("pages").notNull(),
  price: doublePrecision("price").notNull(),
  on_sale: boolean("on_sale").notNull().default(false),
  sold: integer("sold").notNull().default(0),
  created_at: date("created_at").notNull().defaultNow(),
}, (table) => {
  return {
    uniqueNameIdx: uniqueIndex("book_unique_name_idx").on(table.name),
    authorIdFk: foreignKey({
      columns: [table.author_id],
      foreignColumns: [authors.id],
      name: "book_author_id_fk",
    })
  }
});
export type Books = typeof books.$inferSelect;
export type newBook = typeof books.$inferInsert;

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  created_at: date("created_at").notNull().defaultNow(),
}, (table) => {
  return {
    uniqueNameIdx: uniqueIndex("author_unique_name_idx").on(table.name)
  }
});
export type Authors = typeof authors.$inferSelect;
export type newAuthor = typeof authors.$inferInsert;

export const booksRelations = relations(books, ({ one, many }) => ({
  author: one(authors, {
    fields: [books.id],
    references: [authors.id]
  }),
  carts: many(carts)
}))

export const authorsRelations = relations(authors, ({ many }) => ({
  books: many(books)
}))
