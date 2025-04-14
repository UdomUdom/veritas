import Elysia from "elysia";
import {
  createOrganizer,
  deleteOrganizer,
  getAllOrganizer,
  getOrganizerById,
  updateOrganizer,
} from "@/services/organizers";
import { OrganizerModel } from "@/models/organizer";
import { withHandler } from "@/utils/Control";

const controller = "organizer";

export const organizerController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      withHandler(({ body }) => createOrganizer(body)),
      {
        detail: { summary: "Create organizer" },
        body: OrganizerModel,
      }
    )
    .get(
      "/",
      withHandler(() => getAllOrganizer()),
      {
        detail: { summary: "Get all organizers" },
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getOrganizerById(params.id)),
      {
        detail: { summary: "Get organizer by id" },
      }
    )
    .put(
      "/:id",
      withHandler(({ params, body }) => updateOrganizer(params.id, body)),
      {
        detail: { summary: "Update organizer" },
        body: OrganizerModel,
      }
    )
    .delete(
      "/:id",
      withHandler(({ params }) => deleteOrganizer(params.id)),
      {
        detail: { summary: "Delete organizer" },
      }
    )
);
