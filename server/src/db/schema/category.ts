import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});
