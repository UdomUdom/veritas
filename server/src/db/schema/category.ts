import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { event_category } from ".";

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  event_category: many(event_category),
}));
