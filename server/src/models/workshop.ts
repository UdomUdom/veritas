import { t } from "elysia";

export const WorkshopModel = t.Object({
  title: t.String(),
  description: t.String(),
  category_id: t.String(),
  image_url: t.Optional(t.String()),
  start_date: t.Date(),
  end_date: t.Optional(t.Date()),
  price: t.String(),
  detail: t.String(),
  content: t.String(),
});

export type WorkshopType = typeof WorkshopModel.static;

export const WorkshopModelUpdate = t.Object({
  title: t.Optional(t.String()),
  description: t.Optional(t.String()),
  category_id: t.Optional(t.String()),
  image_url: t.Optional(t.String()),
  start_date: t.Optional(t.Date()),
  end_date: t.Optional(t.Date()),
  price: t.Optional(t.String()),
  detail: t.Optional(t.String()),
  content: t.Optional(t.String()),
});

export type WorkshopTypeUpdate = typeof WorkshopModelUpdate.static;
