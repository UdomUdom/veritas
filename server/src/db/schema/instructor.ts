import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { department, user } from ".";
import { relations } from "drizzle-orm";

export const instructor = pgTable("instructor", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => user.id)
    .notNull(),
  number: text("number").unique().notNull(),
  hire_date: date("hire_date").notNull(),
  department_id: serial("department_id").references(() => department.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const instructorRelations = relations(instructor, ({ one }) => ({
  user: one(user, {
    fields: [instructor.user_id],
    references: [user.id],
  }),
  department: one(department, {
    fields: [instructor.department_id],
    references: [department.id],
  }),
}));
