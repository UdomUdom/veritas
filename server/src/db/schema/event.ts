import {
  date,
  decimal,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { category, organizer, event_category } from ".";

export const event = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price").notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date"),
  time: text("time"),
  location: text("location"),
  image: text("image"),
  info: text("content"),
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
}));
