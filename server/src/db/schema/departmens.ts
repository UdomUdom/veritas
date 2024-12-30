import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { faculties } from "./faculties";

export const departments = pgTable("departments", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
  faculty_id: uuid("faculty_id").references(() => faculties.id),
});
