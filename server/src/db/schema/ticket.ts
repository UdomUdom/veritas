import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { order, ticket_types } from ".";
import { relations } from "drizzle-orm";

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: uuid("order_id")
    .references(() => order.id)
    .notNull(),
  ticket_type_id: uuid("ticket_type_id").references(() => ticket_types.id),
  quantity: integer("quantity").notNull(),
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
  ticket_types: one(ticket_types, {
    fields: [tickets.ticket_type_id],
    references: [ticket_types.id],
  }),
}));
