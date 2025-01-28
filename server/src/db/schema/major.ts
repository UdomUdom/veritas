import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { faculty } from "./faculty";

export const major = pgTable("major", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  faculty_id: serial("faculty_id").references(() => faculty.id),
});
