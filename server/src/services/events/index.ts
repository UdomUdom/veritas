import db from "@/db";
import { eq } from "drizzle-orm";
import { event } from "@/db/schema";
import { QueryType } from "@/models/query";
import { EventType } from "@/models/event";

export const createEvent = async (body: EventType) => {
  const [result] = await db.insert(event).values(body).returning();

  if (!result) throw new Error("Failed to create event");

  return { message: `Event ${result.title} created successfully`, data: null };
};

export const getAllEvent = async ({ limit, offset }: QueryType = {}) => {
  const reuslt = await db.query.event.findMany({
    with: {
      category: true,
    },
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
      ticket_types: true,
    },
  });

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
