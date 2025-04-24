import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { event_ticket, order } from ".";
import { relations } from "drizzle-orm";

export const order_item = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: uuid("order_id")
    .references(() => order.id)
    .notNull(),
  event_ticket_id: uuid("ticket_type_id")
    .references(() => event_ticket.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const order_item_relations = relations(order_item, ({ one, many }) => ({
  order: one(order, {
    fields: [order_item.order_id],
    references: [order.id],
  }),
  event_ticket: one(event_ticket, {
    fields: [order_item.event_ticket_id],
    references: [event_ticket.id],
  }),
}));
