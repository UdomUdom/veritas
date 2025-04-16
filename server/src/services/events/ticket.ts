import db from "@/db";
import { event_ticket } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getTicketByEvent = async (id: string) => {
  const result = await db.query.event_ticket.findMany({
    where: eq(event_ticket.event_id, id),
  });

  return { message: "Get ticket by event", data: result };
};
