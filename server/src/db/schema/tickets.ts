import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { event, order_item } from ".";
import { relations } from "drizzle-orm";

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  event_id: uuid("event_id")
    .references(() => event.id)
    .notNull(),
  order_item_id: uuid("order_item_id")
    .references(() => order_item.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const tickets_relations = relations(tickets, ({ one }) => ({
  event: one(event, {
    fields: [tickets.event_id],
    references: [event.id],
  }),
  order_item: one(order_item, {
    fields: [tickets.order_item_id],
    references: [order_item.id],
  }),
}));
