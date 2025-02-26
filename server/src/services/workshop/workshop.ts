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

const ignoreColumns = {
  category_id: false,
};

export const getWorkshops = async ({ q }: WorkshopsQuery) => {
  const result = await db.query.workshop.findMany({
    columns: ignoreColumns,
    where: q ? ilike(workshop.title, `%${q}%`) : undefined,
    with: {
      category: true,
      workshop_instructor: {
        with: {
          instructor: {
            columns: {
              created_at: false,
              updated_at: false,
            },
          },
        },
        columns: {
          workshop_id: false,
          instructor_id: false,
          created_at: false,
          updated_at: false,
        },
      },
    },
  });

  return result;
};

export const getWorkshopById = async (id: string) => {
  const result = await db.query.workshop.findFirst({
    columns: ignoreColumns,
    where: eq(workshop.id, id),
    with: {
      category: true,
      workshop_instructor: {
        with: {
          instructor: {
            columns: {
              created_at: false,
              updated_at: false,
            },
          },
        },
        columns: {
          workshop_id: false,
          instructor_id: false,
          created_at: false,
          updated_at: false,
        },
      },
    },
  });

  return result;
};

export const createWorkshop = async (body: WorkshopType) => {
  const result = await db.transaction(async (tx) => {
    const [created] = await tx
      .insert(workshop)
      .values({
        ...body,
        start_date: body.start_date ? FormatDate(body.start_date) : "",
        start_time: body.end_date ? FormatDate(body.end_date) : "",
        end_date: body.start_date ? FormatTime(body.start_date) : "",
        end_time: body.end_date ? FormatTime(body.end_date) : "",
      })
      .returning();

    if (!created) throw new Error("Failed to create workshop");

    return created;
  });

  return result;
};

export const updateWorkshop = async (id: string, body: WorkshopTypeUpdate) => {
  const result = await db.transaction(async (tx) => {
    const [updated] = await tx
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

    if (!updated) throw new Error("Failed to update workshop");

    return updated;
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
