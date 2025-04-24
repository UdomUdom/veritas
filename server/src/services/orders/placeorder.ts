import db from "@/db";
import { order, order_item } from "@/db/schema";
import { PlaceOrderType } from "@/models/order";

export const placeOrder = async (body: PlaceOrderType) => {
  const result = await db.transaction(async (tx) => {
    const [place_order] = await tx
      .insert(order)
      .values({
        user_id: body.user_id,
        event_id: body.event_id,
        total: body.total,
        status: "pending",
      })
      .returning();

    if (!place_order) throw new Error("Failed to place order");

    const items = body.items.map((item) => ({
      order_id: place_order.id,
      event_ticket_id: item.event_ticket_id,
      quantity: item.quantity,
    }));

    const [create_order_items] = await tx
      .insert(order_item)
      .values(items)
      .returning();

    if (!create_order_items) throw new Error("Failed to create order items");

    return place_order;
  });

  return { message: "Place order", data: result };
};
