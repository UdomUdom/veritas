import { t } from "elysia";

export const BlogModel = t.Object({
  title: t.String(),
  description: t.Optional(t.String()),
  image: t.String(),
  content: t.Optional(t.String()),
  author: t.String(),
  category_id: t.Optional(t.String()),
});

export type BlogType = typeof BlogModel.static;
