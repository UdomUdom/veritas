import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { course } from ".";
import { relations } from "drizzle-orm";

export const subject = pgTable("subject", {
  id: serial("id").primaryKey(),
  course_id: serial("course_id")
    .references(() => course.id)
    .notNull(),
  code: text("code").notNull().unique(),
  name: text("name").notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const subjectRelations = relations(subject, ({ one }) => ({
  course: one(course, {
    fields: [subject.course_id],
    references: [course.id],
  }),
}));
