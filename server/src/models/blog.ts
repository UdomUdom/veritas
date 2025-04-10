import { t } from "elysia";

export const BlogModel = t.Object({
  title: t.String(),
  description: t.Optional(t.String()),
  image: t.String(),
  info: t.Optional(t.String()),
  content: t.Optional(t.String()),
  author: t.String(),
});

export type BlogType = typeof BlogModel.static;
