import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { category } from ".";
import { relations } from "drizzle-orm";

export const bootcamp = pgTable("bootcamp", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category_id: uuid("category")
    .references(() => category.id)
    .notNull(),
  image_url: text("image_url"),
  start_date: text("date").notNull(),
  end_date: text("end_date"),
  start_time: text("start_time").notNull(),
  end_time: text("end_time"),
  price: text("price").notNull(),
  location: text("location").notNull(),
  detail: text("detail").notNull(),
  content: text("content"),
  max_participants: integer("max_participants").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const bootcampRelations = relations(bootcamp, ({ one }) => ({
  category: one(category, {
    fields: [bootcamp.category_id],
    references: [category.id],
  }),
}));
