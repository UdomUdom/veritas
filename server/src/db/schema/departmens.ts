import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { faculties } from "./faculties";

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  role_id: serial("roles_id").references(() => roles.id),
  faculty_id: serial("faculty_id").references(() => faculties.id),
});
