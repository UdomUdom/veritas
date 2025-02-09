import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from ".";

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const roleRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
