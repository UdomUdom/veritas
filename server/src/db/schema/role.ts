import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from ".";

export const role = pgTable("role", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const roleRelations = relations(role, ({ many }) => ({
  users: many(user),
}));
