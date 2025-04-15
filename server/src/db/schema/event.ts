import {
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { category, organizer, ticket_types } from ".";

export const event_status = pgEnum("event_status", [
  "draft",
  "scheduled",
  "published",
  "archived",
]);

export const event = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").unique().notNull(),
  description: text("description"),
  image: text("image").notNull(),
  banner: text("banner"),
  location: text("location"),
  start_date: date("start_date").notNull(),
  end_date: date("end_date"),
  status: event_status().notNull(),
  info: text("info"),
  scheduled_publish_at: timestamp("scheduled_publish_at"),
  category_id: uuid("category_id").references(() => category.id),
  organizer_id: uuid("organizer_id").references(() => organizer.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const event_relations = relations(event, ({ one, many }) => ({
  category: one(category, {
    fields: [event.category_id],
    references: [category.id],
  }),
  organizer: one(organizer, {
    fields: [event.organizer_id],
    references: [organizer.id],
  }),
  ticket_types: many(ticket_types),
}));
