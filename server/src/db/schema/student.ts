import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { enrollment, group_enrollment, group_member, user } from ".";
import { relations } from "drizzle-orm";

export const student = pgTable("student", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => user.id)
    .notNull(),
  number: text("number").unique().notNull(),
  admission_date: date("admission_date").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const studentRelations = relations(student, ({ one, many }) => ({
  user: one(user, {
    fields: [student.user_id],
    references: [user.id],
  }),
  enrollments: many(enrollment),
  leaders: many(group_enrollment),
  group_members: many(group_member),
}));
