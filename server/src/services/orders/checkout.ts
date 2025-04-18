import db from "@/db";
import { event_ticket, order, order_item, tickets } from "@/db/schema";
import { createCharges } from "@/libs/Omise";
import { CheckoutType } from "@/models/order";
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

export const paymentOrder = async (body: CheckoutType, id: string) => {
  const this_order = await db.query.order.findFirst({
    where: eq(order.id, id),
  });

  if (!this_order) throw new Error("Order not found");

  const omise = (await createCharges(body.source, this_order?.total, id)) as {
    id: string;
    authorize_uri: string;
  };

  const data = {
    authorize_uri: omise.authorize_uri,
  };

  return { message: "Payment Confirmed", data };
};
