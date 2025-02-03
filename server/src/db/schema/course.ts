import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { department, enrollment, group_enrollment, subject } from ".";

export const course = pgTable("course", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  department_id: serial("department_id")
    .references(() => department.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const courseRelations = relations(course, ({ one, many }) => ({
  department: one(department, {
    fields: [course.department_id],
    references: [department.id],
  }),
  subjects: many(subject),
  enrollments: many(enrollment),
  group_enrollments: many(group_enrollment),
}));
