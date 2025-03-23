import db from "@/db";
import { eq } from "drizzle-orm";
import { instructor } from "@/db/schema";
import { InstructorType } from "@/models/instructor";

export const getInstructors = async () => {
  const result = db.query.instructor.findMany({
    with: {
      workshop_instructor: {
        with: {
          workshop: {
            columns: {
              created_at: false,
              updated_at: false,
            },
          },
        },
        columns: {
          instructor_id: false,
          workshop_id: false,
          created_at: false,
          updated_at: false,
        },
      },
    },
  });

  return result;
};

export const getInstructorById = async (id: string) => {
  const result = db.query.instructor.findFirst({
    where: eq(instructor.id, id),
    with: {
      workshop_instructor: {
        with: {
          workshop: {
            columns: {
              created_at: false,
              updated_at: false,
            },
          },
        },
        columns: {
          instructor_id: false,
          workshop_id: false,
          created_at: false,
          updated_at: false,
        },
      },
    },
  });

  if (!result) throw new Error("Instructor not found");

  return result;
};

export const createInstructor = async (body: InstructorType) => {
  const result = db.transaction(async (tx) => {
    const existing = await tx.query.instructor.findFirst({
      where: eq(instructor.firstname, body.firstname),
    });

    if (existing) throw new Error("Instructor already exists");

    const [created] = await tx.insert(instructor).values(body).returning();

    if (!created) throw new Error("Failed to create instructor");

    return created;
  });

  return result;
};

export const updateInstructor = async (id: string, body: InstructorType) => {
  const result = db.transaction(async (tx) => {
    const [updated] = await tx
      .update(instructor)
      .set(body)
      .where(eq(instructor.id, id))
      .returning();

    if (!updated) throw new Error("Failed to update instructor");

    return updated;
  });

  return result;
};

export const deleteInstructor = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const [deleted] = await tx
      .delete(instructor)
      .where(eq(instructor.id, id))
      .returning();

    if (!deleted) throw new Error("Failed to delete instructor");

    return deleted;
  });

  return result;
};
