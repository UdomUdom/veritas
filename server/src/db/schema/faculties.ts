import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const faculties = pgTable("faculties", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
});
