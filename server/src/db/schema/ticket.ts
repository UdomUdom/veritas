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
import { event } from ".";

export const eType = pgEnum("type", ["regular", "vip"]);

export const ticket = pgTable("ticket", {
  id: uuid("id").primaryKey().defaultRandom(),
  event_id: uuid("event_id")
    .references(() => event.id)
    .notNull(),
  type: eType().notNull(),
  price: decimal("price").notNull(),
  quantity: integer("quantity").notNull(),
  sale_start_date: date("sale_start_date").notNull(),
  sale_end_date: date("sale_end_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const ticketRelations = relations(ticket, ({ one }) => ({
  event: one(event, {
    fields: [ticket.event_id],
    references: [event.id],
  }),
}));
