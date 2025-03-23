import { decimal, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { category, workshop_instructor } from ".";
import { relations } from "drizzle-orm";

export const workshop = pgTable("workshop", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  category_id: uuid("category").references(() => category.id),
  image_url: text("image_url"),
  start_date: text("date").notNull(),
  end_date: text("end_date"),
  start_time: text("start_time").notNull(),
  end_time: text("end_time"),
  price: decimal("price"),
  location: text("location").notNull(),
  detail: text("detail"),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workshopRelations = relations(workshop, ({ one, many }) => ({
  workshop_instructor: many(workshop_instructor),
  category: one(category, {
    fields: [workshop.category_id],
    references: [category.id],
  }),
}));
