import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { event } from ".";

export const organizer = pgTable("organizer", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  image: text("image"),
  email: text("email"),
  phone: text("phone"),
  website: text("website"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const organizerRelations = relations(organizer, ({ many }) => ({
  event: many(event),
}));
