import db from "@/db";
import { desc, eq } from "drizzle-orm";
import { event, event_ticket } from "@/db/schema";
import { QueryType } from "@/models/query";
import { EventType } from "@/models/event";

export const createEvent = async (body: EventType) => {
  const result = await db.transaction(async (tx) => {
    const [created_event] = await tx
      .insert(event)
      .values({
        ...body,
        status: body.status || "draft",
      })
      .returning();

    if (!created_event) throw new Error("Failed to create event");

    body.tickets?.forEach(async (ticket) => {
      const [created_ticket] = await tx
        .insert(event_ticket)
        .values({
          ...ticket,
          event_id: created_event.id,
        })
        .returning();

      if (!created_ticket) throw new Error("Failed to create ticket");
    });

    return created_event;
  });

  return { message: `Event ${result.title} created successfully`, data: null };
};

export const getAllEvent = async ({ limit, offset }: QueryType = {}) => {
  const reuslt = await db.query.event.findMany({
    with: {
      category: true,
    },
    orderBy: [desc(event.created_at)],
    limit,
    offset,
  });

  return { message: "Get all events", data: reuslt };
};

export const getEventById = async (id: string) => {
  const result = await db.query.event.findFirst({
    where: eq(event.id, id),
    with: {
      category: true,
      organizer: true,
      event_ticket: true,
    },
  });

  if (!result) throw new Error("Event not found");

  return { message: "Get event by id", data: result };
};

export const updateEvent = async (id: string, body: EventType) => {
  const [result] = await db
    .update(event)
    .set(body)
    .where(eq(event.id, id))
    .returning();

  if (!result) throw new Error("Failed to update event");

  return { message: `Update event ${result.title} success`, data: null };
};

export const deleteEvent = async (id: string) => {
  const [result] = await db.delete(event).where(eq(event.id, id)).returning();

  if (!result) throw new Error("Failed to delete event");

  return { message: `Delete event ${result.title} success`, data: null };
};
