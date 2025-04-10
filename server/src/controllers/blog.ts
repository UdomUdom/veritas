import Elysia from "elysia";
import { BlogModel } from "@/models/blog";
import { QueryModel } from "@/models/query";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from "@/services/blogs/blog";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "blog";

export const blogController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const { message, data } = await createBlog(body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        body: BlogModel,
      }
    )
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const { message, data } = await getAllBlog(query);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get all blogs" },
        query: QueryModel,
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await getBlogById(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get blog by id" },
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const { message, data } = await updateBlog(params.id, body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Update blog" },
        body: BlogModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await deleteBlog(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Delete blog" },
      }
    )
);
