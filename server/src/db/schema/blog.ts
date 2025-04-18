import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { category } from ".";

export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  content: text("content"),
  author: text("author"),
  category_id: uuid("category_id").references(() => category.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const blogRelations = relations(blog, ({ one }) => ({
  category: one(blog, {
    fields: [blog.id],
    references: [blog.id],
  }),
}));
