import db from "@/db";
import { event_ticket, order, order_item } from "@/db/schema";
import { createCheckoutSession } from "@/libs/Stripe";
import { and, eq, gt } from "drizzle-orm";

export const checkoutConfirm = async (id: string) => {
  const order_items = await db.query.order_item.findMany({
    where: eq(order_item.order_id, id),
  });

  if (order_items.length === 0) throw new Error("Order not found");

  // reserve tickets
  const result = await db.transaction(async (tx) => {
    order_items.forEach(async (item) => {
      const et = await tx.query.event_ticket.findFirst({
        where: eq(event_ticket.id, item.event_ticket_id),
      });

      if (!et) throw new Error("Ticket not found");

      if (et.available < item.quantity) {
        throw new Error("Not enough tickets available");
      }

      const decrement = await tx
        .update(event_ticket)
        .set({ available: et.available - item.quantity })
        .where(
          and(
            eq(event_ticket.id, item.event_ticket_id),
            gt(event_ticket.available, item.quantity - 1)
          )
        )
        .returning();

      if (decrement.length === 0) {
        throw new Error("Ticket quantity was updated by another transaction");
      }

      return decrement;
    });

    const [update_order] = await tx
      .update(order)
      .set({ status: "waiting" })
      .where(eq(order.id, id))
      .returning();

    if (!update_order) throw new Error("Order not found");
  });

  return { message: "Checkout Confirmed", data: result };
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

export const paymentOrder = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const current_order = await tx.query.order.findFirst({
      where: eq(order.id, id),
    });

    if (!current_order) throw new Error("Order not found");

    const session = await createCheckoutSession({
      id: current_order.id,
      event_id: current_order.event_id,
      total: current_order.total,
    });

    const [updated_order] = await tx
      .update(order)
      .set({ session_id: session.id })
      .where(eq(order.id, id))
      .returning();

    if (!updated_order) throw new Error("Order not found");

    return {
      order: updated_order,
      session_id: session.id,
    };
  });

  return { message: "Payment Confirmed", data: result };
};
