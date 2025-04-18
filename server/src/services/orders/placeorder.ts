import db from "@/db";
import { order, order_item, tickets } from "@/db/schema";
import { createCharges } from "@/libs/Omise";
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

    // body.ticket_type.forEach(async (item) => {
    //   if (item.quantity <= 0) throw new Error("Invalid quantity");

    //   let order_items = [];

    //   for (let i = 0; i < item.quantity; i++) {
    //     order_items.push({
    //       order_id: place_order.id,
    //       ticket_type_id: item.ticket_type_id,
    //     });
    //   }

    //   const [created] = await tx
    //     .insert(tickets)
    //     .values(order_items)
    //     .returning();

    //   if (!created) throw new Error("Failed to create ticket");
    // });

    return place_order;

    // const omise_res = await createCharges(
    //   body.source,
    //   body.amount,
    //   place_order.id
    // );

    // return omise_res;
  });

  return { message: "Place order", data: result };
};
