import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { role } from ".";

export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").unique().notNull(),
  tel: text("tel"),
  gender: text("gender"),
  birthdate: date("birthdate"),
  avatar: text("avatar"),
  role_id: uuid("role_id").references(() => role.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp("deleted_at"),
});

export const userRelations = relations(user, ({ one }) => ({
  role: one(role, {
    fields: [user.role_id],
    references: [role.id],
  }),
}));
