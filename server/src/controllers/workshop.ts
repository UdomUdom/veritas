import Elysia from "elysia";
import {
  createWorkshop,
  deleteWorkshop,
  getWorkshopById,
  getWorkshops,
  updateWorkshop,
} from "@/services/workshop/workshop";
import { WorkshopModel, WorkshopModelUpdate } from "@/models/workshop";

export const workshopController = new Elysia({
  detail: {
    tags: ["workshop"],
  },
}).group("workshop", (app) =>
  app
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const result = await getWorkshops(query);
          return {
            status: "ok",
            data: result,
          };
        } catch (err) {
          return error(400, err);
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
          return {
            status: "ok",
            data: result,
          };
        } catch (err) {
          return error(400, err);
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
          return {
            status: "ok",
            data: `Workshop ${result.title} created`,
          };
        } catch (err) {
          return error(400, err);
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
          return {
            status: "ok",
            data: `Workshop ${result.title} updated`,
          };
        } catch (err) {
          return error(400, err);
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
          return {
            status: "ok",
            data: `Workshop ${result.title} deleted`,
          };
        } catch (err) {
          return error(400, err);
        }
      },
      {
        detail: { summary: "delete workshop" },
      }
    )
);
