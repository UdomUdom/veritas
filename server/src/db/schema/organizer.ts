import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { event } from ".";

export const organizer = pgTable("organizer", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  image: text("image"),
  email: text("email"),
  phone: text("phone"),
  website: text("website"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp("deleted_at"),
});

export const organizer_relations = relations(organizer, ({ many }) => ({
  event: many(event),
}));
