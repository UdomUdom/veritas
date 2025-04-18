import db from "@/db";
import { order } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getOrderByUserId = async (id: string) => {
  const result = await db.query.order.findMany({
    where: eq(order.user_id, id),
    with: {
      event: true,
      order_item: {
        with: {
          event_ticket: true,
        },
      },
    },
  });

  if (!result) throw new Error("Order not found");

  return { message: `Get order by user id`, data: result };
};
