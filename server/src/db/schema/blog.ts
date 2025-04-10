import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  info: text("info"),
  content: text("content"),
  author: text("author"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
