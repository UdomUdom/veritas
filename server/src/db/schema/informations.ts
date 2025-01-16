import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { departments } from "./departmens";

export const informations = pgTable("informations", {
  id: uuid("id").primaryKey().defaultRandom(),
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
  role_id: serial("role_id").references(() => roles.id),
  department_id: serial("departments_id").references(() => departments.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});
