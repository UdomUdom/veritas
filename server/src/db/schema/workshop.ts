import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { category } from ".";

export const workshop = pgTable("workshop", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category_id: text("category")
    .references(() => category.id)
    .notNull(),
  image_url: text("image_url").notNull(),
  schedule: text("schedule").notNull(),
  price: text("price").notNull(),
  detail: text("detail").notNull(),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
