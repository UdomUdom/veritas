import Elysia from "elysia";
import { CategoryModel } from "@/models/category";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "@/services/categories/category";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "category";

export const categoryController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const { message, data } = await createCategory(body.name);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "Create category",
        },
        body: CategoryModel,
      }
    )
    .get(
      "/",
      async ({ error }) => {
        try {
          const { message, data } = await getAllCategory();
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get all categories" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await getCategoryById(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get category by id" },
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const { message, data } = await updateCategory(params.id, body.name);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Update category" },
        body: CategoryModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await deleteCategory(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Delete category" },
      }
    )
);
