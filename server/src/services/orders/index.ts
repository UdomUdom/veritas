import db from "@/db";
import { order } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllOrder = async () => {
  const result = await db.query.order.findMany();

  return { message: "Get all Orders", data: result };
};

export const getOrderById = async (id: string) => {
  const result = await db.query.order.findFirst({
    where: eq(order.id, id),
    with: {
      event: true,
      order_item: {
        with: {
          event_ticket: true,
        },
      },
      tickets: true,
    },
  });

  if (!result) throw new Error("Order not found");

  return { message: `Get order by id`, data: result };
};
