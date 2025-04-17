import db from "@/db";
import { tickets } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getTicketById = async (id: string) => {
  const result = await db.query.tickets.findFirst({
    where: eq(tickets.id, id),
    with: {
      order: {
        with: {
          event: true,
        },
      },
      order_item: {
        with: {
          event_ticket: true,
        },
      },
    },
  });

  return { message: "Ticket by id", data: result };
};
