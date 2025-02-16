import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from ".";

export const instructor = pgTable("instructor", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => user.id),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
