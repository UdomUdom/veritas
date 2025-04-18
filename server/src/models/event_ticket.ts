import { t } from "elysia";

export const EventTicketModel = t.Object({
  event_id: t.String(),
  type: t.String(),
  price: t.Number(),
  available: t.Number(),
});

export type EventTicketType = typeof EventTicketModel.static;
