import Elysia from "elysia";
import { CategoryModel } from "@/models/category";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from "@/services/category";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "category";

export const categoryController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const result = await getCategory(query);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get all categories" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await getCategoryById(params.id);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get category by id" },
      }
    )
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const result = await createCategory(body);
          return SuccessHandler(`Category ${result.name} created`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "create category" },
        body: CategoryModel,
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const result = await updateCategory(params.id, body);
          return SuccessHandler(`Category ${result.name} updated`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "update category" },
        body: CategoryModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await deleteCategory(params.id);
          return SuccessHandler(`Category ${result.name} deleted`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "delete category" },
      }
    )
);
