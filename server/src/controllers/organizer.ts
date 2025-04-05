import Elysia from "elysia";
import { OrganizerModel } from "@/models/organizer";
import {
  createOrganizer,
  deleteOrganizer,
  getAllOrganizers,
  getOrganizerById,
  updateOrganizer,
} from "@/services/organizers/organizer";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "Organizer";

export const organizerController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const { message, data } = await createOrganizer(body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Create organizer" },
        body: OrganizerModel,
      }
    )
    .get(
      "/",
      async ({ error }) => {
        try {
          const { message, data } = await getAllOrganizers();
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get all organizers" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await getOrganizerById(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get organizer by id" },
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const { message, data } = await updateOrganizer(params.id, body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Update organizer" },
        body: OrganizerModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await deleteOrganizer(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Delete organizer" },
      }
    )
);
