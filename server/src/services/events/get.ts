import db from "@/db";
import { eq, sql } from "drizzle-orm";
import { category, event } from "@/db/schema";
import { QueryType } from "@/models/query";

export const getEventByCategory = async (name: string) => {
  const cat = await db.query.category.findFirst({
    where: eq(category.name, name),
  });

  if (!cat) throw new Error("Category not found");

  const result = await db.query.event.findMany({
    where: eq(event.category_id, cat.id),
  });

  return { message: "Get event by category", data: result };
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
    where: eq(event.status, "published"),
    orderBy: (event, { desc }) => [desc(event.scheduled_publish_at)],
    limit: limit || 12,
    offset: offset || 0,
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
