import Elysia from "elysia";
import {
  createWorkshop,
  deleteWorkshop,
  getWorkshopById,
  getWorkshops,
  updateWorkshop,
} from "@/services/workshop";
import { WorkshopModel, WorkshopModelUpdate } from "@/models/workshop";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "workshop";

export const workshopController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const result = await getWorkshops(query);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get all workshops" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await getWorkshopById(params.id);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get workshop by id" },
      }
    )
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const result = await createWorkshop(body);
          return SuccessHandler(`Workshop ${result.title} created`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "create workshop" },
        body: WorkshopModel,
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const result = await updateWorkshop(params.id, body);
          return SuccessHandler(`Workshop ${result.title} updated`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "update workshop" },
        body: WorkshopModelUpdate,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await deleteWorkshop(params.id);
          return SuccessHandler(`Workshop ${result.title} deleted`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "delete workshop" },
      }
    )
);
