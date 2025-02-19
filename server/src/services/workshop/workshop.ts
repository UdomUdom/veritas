import db from "@/db";
import { eq, ilike } from "drizzle-orm";
import { workshop } from "@/db/schema";
import { WorkshopType, WorkshopTypeUpdate } from "@/models/workshop";
import { FormatDate, FormatTime } from "@/utils/FormatDate";

interface WorkshopsQuery {
  q?: string;
  offset?: number;
  limit?: number;
}

export const getWorkshops = async ({ q, offset, limit }: WorkshopsQuery) => {
  const result = await db.query.workshop.findMany({
    columns: {
      category_id: false,
    },
    where: q ? ilike(workshop.title, `%${q}%`) : undefined,
    with: {
      category: true,
    },
    limit: limit || 12,
    offset: offset || 0,
  });

  return result;
};

export const getWorkshopById = async (id: string) => {
  const result = await db.query.workshop.findFirst({
    where: eq(workshop.id, id),
  });

  return result;
};

export const createWorkshop = async (body: WorkshopType) => {
  const result = await db.transaction(async (tx) => {
    const [new_workshop] = await tx
      .insert(workshop)
      .values({
        ...body,
        start_date: body.start_date ? FormatDate(body.start_date) : "",
        start_time: body.end_date ? FormatDate(body.end_date) : "",
        end_date: body.start_date ? FormatTime(body.start_date) : "",
        end_time: body.end_date ? FormatTime(body.end_date) : "",
      })
      .returning();

    if (!new_workshop) throw new Error("Failed to create workshop");

    return new_workshop;
  });

  return result;
};

export const updateWorkshop = async (id: string, body: WorkshopTypeUpdate) => {
  const result = await db.transaction(async (tx) => {
    const [update_workshop] = await tx
      .update(workshop)
      .set({
        ...body,
        start_date: body.start_date ? FormatDate(body.start_date) : "",
        start_time: body.end_date ? FormatDate(body.end_date) : "",
        end_date: body.start_date ? FormatTime(body.start_date) : "",
        end_time: body.end_date ? FormatTime(body.end_date) : "",
      })
      .where(eq(workshop.id, id))
      .returning();

    if (!update_workshop) throw new Error("Failed to update workshop");

    return update_workshop;
  });

  return result;
};

export const deleteWorkshop = async (id: string) => {
  const [result] = await db
    .delete(workshop)
    .where(eq(workshop.id, id))
    .returning();

  if (!result) throw new Error("Failed to delete workshop");

  return result;
};
