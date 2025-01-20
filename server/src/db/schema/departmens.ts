import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { faculties } from "./faculties";
import { relations } from "drizzle-orm";

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  faculty_id: serial("faculty_id").references(() => faculties.id),
});

export const departmentRelations = relations(departments, ({ one }) => ({
  faculty: one(faculties, {
    fields: [departments.faculty_id],
    references: [faculties.id],
  }),
}));
