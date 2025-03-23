import { t } from "elysia";

export const WorkshopModel = t.Object({
  title: t.String(),
  description: t.Optional(t.String()),
  category_id: t.Optional(t.String()),
  image_url: t.Optional(t.String()),
  start_date: t.Date(),
  end_date: t.Optional(t.Date()),
  start_time: t.String(),
  end_time: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  location: t.String(),
  detail: t.Optional(t.String()),
  content: t.Optional(t.String()),
  instructor: t.Optional(t.Array(t.String())),
});

export type WorkshopType = typeof WorkshopModel.static;

export const WorkshopModelUpdate = t.Object({
  title: t.Optional(t.String()),
  description: t.Optional(t.String()),
  category_id: t.Optional(t.String()),
  image_url: t.Optional(t.String()),
  start_date: t.Optional(t.Date()),
  end_date: t.Optional(t.Date()),
  start_time: t.Optional(t.String()),
  end_time: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  location: t.Optional(t.String()),
  detail: t.Optional(t.String()),
  content: t.Optional(t.String()),
  instructor: t.Optional(t.Array(t.String())),
});

export type WorkshopTypeUpdate = typeof WorkshopModelUpdate.static;
