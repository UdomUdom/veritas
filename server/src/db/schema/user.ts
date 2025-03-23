import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { role } from ".";

export const eStatus = pgEnum("status", ["active", "inactive"]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  auth_id: text("auth_id").unique().notNull(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  role_id: uuid("role_id")
    .references(() => role.id)
    .notNull(),
  status: eStatus().notNull(),
  avatar: text("avatar"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(user, ({ one }) => ({
  role: one(role, {
    fields: [user.role_id],
    references: [role.id],
  }),
}));
