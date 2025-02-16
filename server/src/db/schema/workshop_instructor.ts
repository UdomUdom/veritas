import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { instructor, workshop } from ".";

export const workshop_instructor = pgTable("workshop_instructor", {
  id: uuid("id").primaryKey().defaultRandom(),
  workshop_id: uuid("workshop_id")
    .references(() => workshop.id)
    .notNull(),
  instructor_id: uuid("instructor_id")
    .references(() => instructor.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
