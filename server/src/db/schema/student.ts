import {
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { person } from "./person";

export const eStatus = pgEnum("status", [
  "active",
  "inactive",
  "graduated",
  "retired",
  "suspended",
]);

export const student = pgTable("student", {
  id: uuid("id").primaryKey().defaultRandom(),
  person_id: uuid("person_id")
    .references(() => person.id)
    .notNull(),
  number: text("number").unique().notNull(),
  admission_date: time("admission_date").notNull(),
  status: eStatus(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
