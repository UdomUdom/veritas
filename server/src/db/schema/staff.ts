import { pgEnum, pgTable, time, timestamp, uuid } from "drizzle-orm/pg-core";
import { person } from "./person";

export const eStatus = pgEnum("status", [
  "active",
  "inactive",
  "retired",
  "suspended",
]);

export const staff = pgTable("staff", {
  id: uuid("id").primaryKey().defaultRandom(),
  person_id: uuid("person_id")
    .references(() => person.id)
    .notNull(),
  hire_date: time("hire_date").notNull(),
  status: eStatus(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
