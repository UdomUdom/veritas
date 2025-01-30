import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { course, student } from ".";
import { relations } from "drizzle-orm";

export const eStatus = pgEnum("status", ["pending", "confirmed", "rejected"]);

export const enrollment = pgTable("enrollment", {
  id: uuid("id").primaryKey(),
  student_id: uuid("student_id")
    .references(() => student.id)
    .notNull(),
  course_id: serial("subject_id")
    .references(() => course.id)
    .notNull(),
  status: text("status").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const enrollmentRelations = relations(enrollment, ({ one }) => ({
  student: one(student, {
    fields: [enrollment.student_id],
    references: [student.id],
  }),
  course: one(course, {
    fields: [enrollment.course_id],
    references: [course.id],
  }),
}));
