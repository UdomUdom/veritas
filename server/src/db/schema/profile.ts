import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from ".";

export const eStatus = pgEnum("status", ["active", "inactive"]);

export const profile = pgTable("profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
  date_of_birth: time("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  phone_number: text("phone_number").notNull(),
  address: text("address").notNull(),
  bio: text("bio"),
  picture: text("picture"),
  status: eStatus().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user),
}));
