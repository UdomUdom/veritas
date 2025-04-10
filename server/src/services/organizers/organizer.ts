import db from "@/db";
import { organizer } from "@/db/schema";
import { OrganizerType } from "@/models/organizer";
import { eq } from "drizzle-orm";

export const createOrganizer = async (body: OrganizerType) => {
  const [result] = await db
    .insert(organizer)
    .values({
      name: body.name!,
      ...body,
    })
    .returning();

  if (!result) throw new Error("Failed to create organizer");

  return {
    message: `Organizer ${result.name} created successfully`,
    data: null,
  };
};

export const getAllOrganizer = async () => {
  const result = await db.query.organizer.findMany();

  return { message: "Get all organizers", data: result };
};

export const getOrganizerById = async (id: string) => {
  const result = await db.query.organizer.findFirst({
    where: eq(organizer.id, id),
  });

  return { message: "Get organizer by id", data: result };
};

export const updateOrganizer = async (id: string, body: OrganizerType) => {
  const [result] = await db
    .update(organizer)
    .set(body)
    .where(eq(organizer.id, id))
    .returning();

  if (!result) throw new Error("Failed to update organizer");

  return { message: `Update organizer ${result.name} success`, data: null };
};

export const deleteOrganizer = async (id: string) => {
  const [result] = await db
    .update(organizer)
    .set({ deleted_at: new Date() })
    .where(eq(organizer.id, id))
    .returning();

  if (!result) throw new Error("Failed to delete organizer");

  return { message: `Delete organizer ${result.name} success`, data: null };
};
