import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const instructors = pgTable("instructors", {
  id: uuid("id").primaryKey().defaultRandom(),
  number: text("number").unique().notNull(),
  user_id: uuid("user_id").references(() => users.id),
  hire_date: timestamp("hire_date"),
  hire_year: text("hire_year"),
  salary: integer("salary"),
  academic_degree: text("academic_degree"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});
