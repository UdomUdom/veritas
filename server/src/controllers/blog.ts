import { BlogModel, BlogUpdateModel } from "@/models/blog";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "@/services/blog";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";
import Elysia from "elysia";

export const blogController = new Elysia({
  detail: {
    tags: ["blog"],
  },
}).group("blog", (app) =>
  app
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const result = await getBlogs(query);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get all blogs" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await getBlogById(params.id);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get blog by id" },
      }
    )
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const result = await createBlog(body);
          return SuccessHandler(`Blog ${result.title} created`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "create blog" },
        body: BlogModel,
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const result = await updateBlog(params.id, body);
          return SuccessHandler(`Blog ${result.title} updated`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "update blog" },
        body: BlogUpdateModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await deleteBlog(params.id);
          return SuccessHandler(`Blog ${result.title} deleted`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "delete blog" },
      }
    )
);
