import db from "@/db";
import { order } from "@/db/schema";
import { eq } from "drizzle-orm";

export const checkoutConfirm = async (id: string) => {
  const [result] = await db
    .update(order)
    .set({ status: "waiting" })
    .where(eq(order.id, id))
    .returning();

  if (!result) throw new Error("Order not found");

  return { message: "Checkout Confirmed", data: null };
};

export const checkoutCancel = async (id: string) => {
  const [result] = await db
    .update(order)
    .set({ status: "cancelled" })
    .where(eq(order.id, id))
    .returning();

  if (!result) throw new Error("Order not found");

  return { message: "Checkout Cancelled", data: null };
};
