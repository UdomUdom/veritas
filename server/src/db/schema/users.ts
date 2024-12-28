import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { departments } from "./departmens";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role_id: uuid("role_id").references(() => roles.id),
  department_id: uuid("department_id").references(() => departments.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});
