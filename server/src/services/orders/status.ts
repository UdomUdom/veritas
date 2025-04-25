import db from "@/db";
import { order } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getOrderByStatus = async (
  status: "pending" | "waiting" | "paid" | "cancelled" | "failed" | "refunded"
) => {
  const result = await db.query.order.findMany({
    where: eq(order.status, status),
  });

  if (!result) throw new Error("Order not found");

  return { message: `Get order by status`, data: result };
};
