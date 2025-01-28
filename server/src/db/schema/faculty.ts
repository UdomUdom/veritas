import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const faculty = pgTable("faculty", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});
