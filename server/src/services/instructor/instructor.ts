import db from "@/db";
import { eq } from "drizzle-orm";
import { instructor } from "@/db/schema";
import { InstructorType } from "@/models/instructor";

export const getInstructors = async () => {
  const result = db.query.instructor.findMany();

  return result;
};

export const getInstructorById = async (id: string) => {
  const result = db.query.instructor.findFirst({
    where: eq(instructor.id, id),
  });

  return result;
};

export const createInstructor = async (body: InstructorType) => {
  const result = db.transaction(async (tx) => {
    const [new_instructor] = await tx
      .insert(instructor)
      .values(body)
      .returning();

    if (!new_instructor) throw new Error("Failed to create instructor");

    return new_instructor;
  });

  return result;
};

export const updateInstructor = async (id: string, body: InstructorType) => {
  const result = db.transaction(async (tx) => {
    const [update_ins] = await tx
      .update(instructor)
      .set(body)
      .where(eq(instructor.id, id))
      .returning();

    if (!update_ins) throw new Error("Failed to update instructor");

    return update_ins;
  });

  return result;
};

export const deleteInstructor = async (id: string) => {
  const result = db.transaction(async (tx) => {
    const [delete_ins] = await tx
      .delete(instructor)
      .where(eq(instructor.id, id))
      .returning();

    if (!delete_ins) throw new Error("Failed to delete instructor");

    return delete_ins;
  });

  return result;
};
