import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { instructor, profile, role, student } from ".";

export const eStatus = pgEnum("status", [
  "pending",
  "rejected",
  "active",
  "inactive",
]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  profile_id: uuid("person_id")
    .references(() => profile.id, { onDelete: "cascade" })
    .notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  role_id: serial("role_id")
    .references(() => role.id)
    .notNull(),
  status: eStatus().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(user, ({ one }) => ({
  profile: one(profile, {
    fields: [user.profile_id],
    references: [profile.id],
  }),
  role: one(role, {
    fields: [user.role_id],
    references: [role.id],
  }),
  student: one(student),
  instructor: one(instructor),
}));
