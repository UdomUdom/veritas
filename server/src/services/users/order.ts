import db from "@/db";
import { order } from "@/db/schema";
import { and, eq, ne, or } from "drizzle-orm";

export const getOrderByUserId = async (id: string) => {
  const result = await db.query.order.findMany({
    where: and(
      eq(order.user_id, id),
      ne(order.status, "failed"),
      ne(order.status, "cancelled"),
      ne(order.status, "refunded")
    ),
    with: {
      event: true,
      order_item: {
        with: {
          event_ticket: true,
        },
      },
    },
    orderBy: (order, { desc }) => [desc(order.created_at)],
  });

  if (!result) throw new Error("Order not found");

  return { message: `Get order by user id`, data: result };
};

export const getOrderToPayByUserId = async (id: string) => {
  const result = await db.query.order.findMany({
    where: and(
      eq(order.user_id, id),
      or(eq(order.status, "pending"), eq(order.status, "waiting"))
    ),
    with: {
      event: true,
      order_item: {
        with: {
          event_ticket: true,
        },
      },
    },
    orderBy: (order, { desc }) => [desc(order.created_at)],
  });

  if (!result) throw new Error("Order not found");

  return { message: `Get order to pay by user id`, data: result };
};
