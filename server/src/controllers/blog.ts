import Elysia from "elysia";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from "@/services/blogs";
import { BlogModel } from "@/models/blog";
import { QueryModel } from "@/models/query";
import { withHandler } from "@/utils/Control";

const controller = "blog";

export const blogController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      withHandler(({ body }) => createBlog(body)),
      {
        body: BlogModel,
      }
    )
    .get(
      "/",
      withHandler(({ query }) => getAllBlog(query)),
      {
        detail: { summary: "Get all blogs" },
        query: QueryModel,
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getBlogById(params.id)),
      {
        detail: { summary: "Get blog by id" },
      }
    )
    .put(
      "/:id",
      withHandler(({ params, body }) => updateBlog(params.id, body)),
      {
        detail: { summary: "Update blog" },
        body: BlogModel,
      }
    )
    .delete(
      "/:id",
      withHandler(({ params }) => deleteBlog(params.id)),
      {
        detail: { summary: "Delete blog" },
      }
    )
);
