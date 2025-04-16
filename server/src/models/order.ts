import { t } from "elysia";

export const PlaceOrderModel = t.Object({
  user_id: t.String(),
  event_id: t.String(),
  total: t.Number(),
  items: t.Array(
    t.Object({
      event_ticket_id: t.String(),
      quantity: t.Number(),
    })
  ),
});

export type PlaceOrderType = typeof PlaceOrderModel.static;
