import db from "@/db";
import { event_ticket, order, order_item, tickets } from "@/db/schema";
import { eq } from "drizzle-orm";
import stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

export const orderWebhook = async (context: any) => {
  let event = await context.request.text();

  if (endpointSecret) {
    const signature = await context.request.headers.get("stripe-signature");

    try {
      event = await stripe.webhooks.constructEventAsync(
        event,
        signature,
        endpointSecret
      );
    } catch (err) {
      throw new Error("Webhook signature verification failed.");
    }
  }

  let result;

  switch (event.type) {
    case "checkout.session.completed":
      result = await order_paid(event.data.object.id);
      return { message: "Order paid", data: result };
    case "checkout.session.expired":
      result = await order_failed(event.data.object.id);
      return { message: "Order failed", data: result };
  }
};

const order_failed = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const this_order = await tx.query.order.findFirst({
      where: eq(order.session_id, id),
    });

    if (!this_order) throw new Error("Order not found");

    if (this_order.status !== "waiting") throw new Error("Order not waiting");

    const items = await tx.query.order_item.findMany({
      where: eq(order_item.order_id, this_order.id),
    });

    items.forEach(async (item) => {
      const currentTicket = await tx.query.event_ticket.findFirst({
        where: eq(event_ticket.id, item.event_ticket_id),
      });

      if (!currentTicket) throw new Error("Event ticket not found");

      const et = await tx
        .update(event_ticket)
        .set({
          available: currentTicket.available + item.quantity,
        })
        .where(eq(event_ticket.id, item.event_ticket_id));

      if (!et) throw new Error("Event ticket not found");
    });

    const [updated_order] = await tx
      .update(order)
      .set({ status: "failed" })
      .where(eq(order.id, this_order.id))
      .returning();

    if (!updated_order) throw new Error("Order not found");

    return updated_order;
  });

  return result;
};

const order_paid = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const this_order = await tx.query.order.findFirst({
      where: eq(order.session_id, id),
    });

    if (!this_order) throw new Error("Order not found");

    if (this_order.status !== "waiting") throw new Error("Order not waiting");

    const items = await tx.query.order_item.findMany({
      where: eq(order_item.order_id, this_order.id),
      with: {
        event_ticket: true,
      },
    });

    items.forEach(async (item) => {
      const new_ticket = [];
      for (let i = 0; i < item.quantity; i++) {
        new_ticket.push({
          user_id: this_order.user_id,
          order_id: this_order.id,
          order_item_id: item.id,
          type: item.event_ticket.type,
          price: item.event_ticket.price,
        });
      }

      const created_ticket = await tx
        .insert(tickets)
        .values(new_ticket)
        .returning();

      if (!created_ticket) throw new Error("Event ticket not found");
    });

    const [updated_order] = await tx
      .update(order)
      .set({ status: "paid" })
      .where(eq(order.id, this_order.id))
      .returning();

    return updated_order;
  });

  return result;
};
