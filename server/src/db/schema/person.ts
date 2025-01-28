import {
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const eStatus = pgEnum("status", ["pending", "active", "inactive"]);

export const person = pgTable("person", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull(),
  date_of_birth: time("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  phone_number: text("phone_number").notNull(),
  status: eStatus(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
