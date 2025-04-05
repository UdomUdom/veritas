import { pgTable, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { category, event } from ".";

export const event_category = pgTable("event_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  event_id: uuid("event_id")
    .notNull()
    .references(() => event.id),
  category_id: uuid("category_id")
    .notNull()
    .references(() => category.id),
});

export const event_category_relations = relations(
  event_category,
  ({ one }) => ({
    event: one(event, {
      fields: [event_category.event_id],
      references: [event.id],
    }),
    category: one(category, {
      fields: [event_category.category_id],
      references: [category.id],
    }),
  })
);
