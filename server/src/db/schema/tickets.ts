import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { order, user } from ".";
import { relations } from "drizzle-orm";

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  order_id: uuid("order_id")
    .references(() => order.id)
    .notNull(),
  type: text("type").notNull(),
  price: doublePrecision("price").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const tickets_relations = relations(tickets, ({ one }) => ({
  user: one(user, {
    fields: [tickets.user_id],
    references: [user.id],
  }),
  order: one(order, {
    fields: [tickets.order_id],
    references: [order.id],
  }),
}));
