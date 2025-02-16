import { date, pgTable, time, timestamp, uuid } from "drizzle-orm/pg-core";
import { workshop } from ".";

export const workshop_schedule = pgTable("workshop_schedule", {
  id: uuid("id").primaryKey().defaultRandom(),
  workshop_id: uuid("workshop_id").references(() => workshop.id),
  start_date: date("date").notNull(),
  end_date: date("end_date"),
  start_time: time("start_time").notNull(),
  end_time: time("end_time"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
