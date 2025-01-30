import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { group_enrollment, student } from ".";
import { relations } from "drizzle-orm";

export const group_member = pgTable("group_member", {
  id: uuid("id").primaryKey().defaultRandom(),
  group_id: uuid("group_id")
    .references(() => group_enrollment.id)
    .notNull(),
  student_id: uuid("user_id")
    .references(() => student.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const group_memberRelations = relations(group_member, ({ one }) => ({
  group: one(group_enrollment, {
    fields: [group_member.group_id],
    references: [group_enrollment.id],
  }),
  student: one(student, {
    fields: [group_member.student_id],
    references: [student.id],
  }),
}));
