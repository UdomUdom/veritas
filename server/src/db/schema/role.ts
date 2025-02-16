import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from ".";

export const role = pgTable("role", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const roleRelations = relations(role, ({ many }) => ({
  users: many(user),
}));
