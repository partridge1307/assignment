import { date, foreignKey, index, pgEnum, pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

export const permissionsEnum = pgEnum('permissions', ['admin', 'user']);

export const users = pgTable('users', {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique("unique_username"),
  password: text("password").notNull(),
  permission: permissionsEnum("permission").notNull().default('user'),
  created_at: date("created_at", { mode: "string" }).notNull().defaultNow()
}, (table) => {
  return {
    usernameIdx: uniqueIndex("user_username_idx").on(table.username)
  };
});
export type Users = typeof users.$inferSelect;
export type newUser = typeof users.$inferInsert;

export const sessions = pgTable('sessions', {
  user_id: serial("user_id").notNull(),
  token: text("token").notNull().unique("unique_token"),
  created_at: date("created_at", { mode: "string" }).notNull().defaultNow()
}, (table) => {
  return {
    parentFk: foreignKey({
      columns: [table.user_id],
      foreignColumns: [users.id],
      name: "user_id_fk",
    }),
    user_id_idx: index("session_user_id_idx").on(table.user_id)
  }
});
export type Sessions = typeof sessions.$inferSelect;
export type newSession = typeof sessions.$inferInsert;
