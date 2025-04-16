import {
  date,
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { event, order_item } from ".";

export const event_ticket = pgTable("event_ticket", {
  id: uuid("id").primaryKey().defaultRandom(),
  event_id: uuid("event_id")
    .references(() => event.id)
    .notNull(),
  type: text().notNull(),
  price: doublePrecision("price").notNull(),
  available: integer("available").notNull(),
  sale_start: date("sale_start_date").notNull(),
  sale_end: date("sale_end_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const event_ticket_relations = relations(
  event_ticket,
  ({ one, many }) => ({
    event: one(event, {
      fields: [event_ticket.event_id],
      references: [event.id],
    }),
    order_item: many(order_item),
  })
);
