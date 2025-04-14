import Elysia from "elysia";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "@/services/categories";
import { CategoryModel } from "@/models/category";
import { withHandler } from "@/utils/Control";

const controller = "category";

export const categoryController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      withHandler(({ body }) => createCategory(body.name)),
      {
        detail: {
          summary: "Create category",
        },
        body: CategoryModel,
      }
    )
    .get(
      "/",
      withHandler(() => getAllCategory()),
      {
        detail: { summary: "Get all categories" },
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getCategoryById(params.id)),
      {
        detail: { summary: "Get category by id" },
      }
    )
    .put(
      "/:id",
      withHandler(({ params, body }) => updateCategory(params.id, body.name)),
      {
        detail: { summary: "Update category" },
        body: CategoryModel,
      }
    )
    .delete(
      "/:id",
      withHandler(({ params }) => deleteCategory(params.id)),
      {
        detail: { summary: "Delete category" },
      }
    )
);
