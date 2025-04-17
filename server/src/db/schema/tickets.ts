import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { order, order_item } from ".";
import { relations } from "drizzle-orm";

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: uuid("order_id")
    .references(() => order.id)
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
  order: one(order, {
    fields: [tickets.order_id],
    references: [order.id],
  }),
  order_item: one(order_item, {
    fields: [tickets.order_item_id],
    references: [order_item.id],
  }),
}));
