import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { category } from ".";
import { relations } from "drizzle-orm";

export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  author_avatar: text("author_avatar"),
  author_name: text("author_name"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category_id: uuid("category").references(() => category.id),
  image_url: text("image_url"),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const blogRelations = relations(blog, ({ one }) => ({
  category: one(category, {
    fields: [blog.category_id],
    references: [category.id],
  }),
}));
