import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { instructor, workshop } from ".";
import { relations } from "drizzle-orm";

export const workshop_instructor = pgTable("workshop_instructor", {
  id: uuid("id").primaryKey().defaultRandom(),
  workshop_id: uuid("workshop_id")
    .references(() => workshop.id, { onDelete: "cascade" })
    .notNull(),
  instructor_id: uuid("instructor_id")
    .references(() => instructor.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workshop_instructorRelations = relations(
  workshop_instructor,
  ({ one }) => ({
    workshop: one(workshop, {
      fields: [workshop_instructor.workshop_id],
      references: [workshop.id],
    }),
    instructor: one(instructor, {
      fields: [workshop_instructor.instructor_id],
      references: [instructor.id],
    }),
  })
);
