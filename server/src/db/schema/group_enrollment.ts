import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { course, group_member, student } from ".";
import { relations } from "drizzle-orm";

export const eStatus = pgEnum("status", ["pending", "confirmed", "rejected"]);

export const group_enrollment = pgTable("group_enrollment", {
  id: uuid("id").primaryKey(),
  leader_id: uuid("leader_id")
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

export const group_enrollmentRelations = relations(
  group_enrollment,
  ({ one, many }) => ({
    leader: one(student, {
      fields: [group_enrollment.leader_id],
      references: [student.id],
    }),
    course: one(course, {
      fields: [group_enrollment.course_id],
      references: [course.id],
    }),
    members: many(group_member),
  })
);
