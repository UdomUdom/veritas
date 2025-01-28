import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { person } from "./person";
import { position } from "./position";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  person_id: uuid("person_id")
    .references(() => person.id)
    .notNull(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  position: serial("position")
    .references(() => position.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
