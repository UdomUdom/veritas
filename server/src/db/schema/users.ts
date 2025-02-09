import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profiles, roles } from ".";

export const eStatus = pgEnum("status", ["active", "inactive"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  profile_id: uuid("person_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  role_id: serial("role_id")
    .references(() => roles.id)
    .notNull(),
  status: eStatus().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.profile_id],
    references: [profiles.id],
  }),
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
}));
