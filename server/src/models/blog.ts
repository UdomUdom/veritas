import { t } from "elysia";

export const BlogModel = t.Object({
  author_avatar: t.Optional(t.String()),
  author_name: t.Optional(t.String()),
  title: t.String(),
  description: t.String(),
  category_id: t.Optional(t.String()),
  image_url: t.Optional(t.String()),
  content: t.Optional(t.String()),
});

export type BlogType = typeof BlogModel.static;

export const BlogUpdateModel = t.Object({
  author_avatar: t.Optional(t.String()),
  author_name: t.Optional(t.String()),
  title: t.Optional(t.String()),
  description: t.Optional(t.String()),
  category_id: t.Optional(t.String()),
  image_url: t.Optional(t.String()),
  content: t.Optional(t.String()),
});

export type BlogUpdateType = typeof BlogUpdateModel.static;
