import db from "@/db";
import { event } from "@/db/schema";
import { EventType } from "@/models/event";
import { QueryType } from "@/models/query";
import { eq, sql } from "drizzle-orm";

export const createEvent = async (body: EventType) => {
  return { message: "Create event", data: null };
};

export const getAllEvent = async ({ limit, offset }: QueryType = {}) => {
  const reuslt = await db.query.event.findMany();

  return { message: "Get all events", data: reuslt };
};

export const getEventById = async (id: string) => {
  const result = await db.query.event.findFirst({
    where: eq(event.id, id),
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

export const getRandomEvent = async ({ limit, offset }: QueryType = {}) => {
  const result = await db.execute(
    sql`SELECT * FROM ${event} ORDER BY RANDOM() LIMIT ${limit || 10} OFFSET ${
      offset || 0
    }`
  );

  return { message: "Get random event", data: result };
};

export const getNewestEvent = async ({ limit, offset }: QueryType = {}) => {
  const result = await db.query.event.findMany({
    orderBy: (event, { desc }) => [desc(event.scheduled_publish_at)],
    limit,
    offset,
  });

  return { message: "Get newest event", data: result };
};

export const getUpcomingEvent = async ({ limit, offset }: QueryType = {}) => {
  const result = await db.query.event.findMany({
    where: eq(event.status, "scheduled"),
    orderBy: (event, { asc }) => [asc(event.start_date)],
    limit,
    offset,
  });

  return { message: "Get upcoming event", data: result };
};
