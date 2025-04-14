import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { blog, event } from ".";

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const category_relations = relations(category, ({ many }) => ({
  event: many(event),
  blog: many(blog),
}));
