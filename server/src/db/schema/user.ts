import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profile } from ".";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  profile_id: uuid("person_id")
    .references(() => profile.id)
    .notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(user, ({ one }) => ({
  person: one(profile, {
    fields: [user.id],
    references: [profile.id],
  }),
}));
