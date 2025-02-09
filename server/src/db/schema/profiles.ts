import { relations } from "drizzle-orm";
import {
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from ".";

export const eGender = pgEnum("gender", ["male", "female", "other"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
  date_of_birth: date("date_of_birth").notNull(),
  gender: eGender().notNull(),
  phone_number: text("phone_number").notNull(),
  address: text("address").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users),
}));
