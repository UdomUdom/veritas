import {
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { category, organizer, event_category, ticket } from ".";

export const eStatus = pgEnum("status", [
  "draft",
  "scheduled",
  "published",
  "archived",
]);

export const event = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  banner: text("banner").notNull(),
  location: text("location"),
  start_date: date("start_date").notNull(),
  end_date: date("end_date"),
  status: eStatus(),
  scheduled_publish_at: timestamp("scheduled_publish_at"),
  info: text("info"),
  category_id: uuid("category_id").references(() => category.id),
  organizer_id: uuid("organizer_id").references(() => organizer.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const eventRelations = relations(event, ({ one, many }) => ({
  event_category: many(event_category),
  organizer: one(organizer, {
    fields: [event.organizer_id],
    references: [organizer.id],
  }),
  ticket: many(ticket),
}));
