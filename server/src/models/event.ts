import { t } from "elysia";

export const EventModel = t.Object({
  title: t.String(),
  description: t.Optional(t.String()),
  image: t.String(),
  banner: t.Optional(t.String()),
  location: t.Optional(t.String()),
  start_date: t.String(),
  end_date: t.Optional(t.String()),
  sale_start: t.Optional(t.String()),
  sale_end: t.Optional(t.String()),
  status: t.Optional(
    t.Union([
      t.Literal("draft"),
      t.Literal("scheduled"),
      t.Literal("published"),
      t.Literal("archived"),
    ])
  ),
  info: t.Optional(t.String()),
  scheduled_publish_at: t.Optional(t.Date()),
  category_id: t.Optional(t.String()),
  organizer_id: t.Optional(t.String()),
  tickets: t.Array(
    t.Object({
      type: t.String(),
      price: t.Number(),
      available: t.Number(),
    })
  ),
});

export type EventType = typeof EventModel.static;
