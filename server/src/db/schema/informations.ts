import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { departments } from "./departmens";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const informations = pgTable("informations", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  gender: text("gender").notNull(),
  birthday: timestamp("birthday").notNull(),
  address: text("address").notNull(),
  status: text("status").notNull(),
  bio: text("bio"),
  picture: text("picture"),
  department_id: serial("departments_id").references(() => departments.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const informationRealtions = relations(informations, ({ one }) => ({
  user: one(users, {
    fields: [informations.user_id],
    references: [users.id],
  }),
}));
