import db from "@/db";
import { event_ticket } from "@/db/schema";
import { EventTicketType } from "@/models/event_ticket";
import { eq } from "drizzle-orm";

export const createEventTicket = async (body: EventTicketType) => {
  const [result] = await db.insert(event_ticket).values(body).returning();

  if (!result) throw new Error("Failed to create event ticket");

  return { message: "Create event ticket", data: result };
};

export const getAllEventTicket = async () => {
  const result = await db.query.event_ticket.findMany();

  return { message: "Get all event tickets", data: result };
};

export const getEventTicketById = async (id: string) => {
  const result = await db.query.event_ticket.findFirst({
    where: eq(event_ticket.id, id),
  });

  if (!result) throw new Error("Event ticket not found");

  return { message: "Get event ticket by id", data: result };
};

export const updateEventTicket = async (body: EventTicketType, id: string) => {
  const [result] = await db
    .update(event_ticket)
    .set(body)
    .where(eq(event_ticket.id, id))
    .returning();

  if (!result) throw new Error("Failed to update event ticket");

  return { message: "Update event ticket", data: result };
};

export const deleteEventTicket = async (id: string) => {
  const result = await db.delete(event_ticket).where(eq(event_ticket.id, id));

  if (!result) throw new Error("Failed to delete event ticket");

  return { message: "Delete event ticket" };
};
