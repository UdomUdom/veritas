import {
  date,
  decimal,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { event, tickets } from ".";

export const eType = pgEnum("type", ["regular", "vip"]);

export const ticket_types = pgTable("ticket_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  event_id: uuid("event_id")
    .references(() => event.id)
    .notNull(),
  type: eType().notNull(),
  price: decimal("price").notNull(),
  available: integer("available").notNull(),
  sale_start: date("sale_start_date").notNull(),
  sale_end: date("sale_end_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const ticket_types_relations = relations(
  ticket_types,
  ({ one, many }) => ({
    event: one(event, {
      fields: [ticket_types.event_id],
      references: [event.id],
    }),
    tickets: many(tickets),
  })
);
