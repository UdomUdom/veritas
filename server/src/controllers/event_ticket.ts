import Elysia from "elysia";
import { withHandler } from "@/utils/Control";
import { EventTicketModel } from "@/models/event_ticket";
import {
  createEventTicket,
  deleteEventTicket,
  getAllEventTicket,
  getEventTicketById,
  updateEventTicket,
} from "../services/event_ticket";

const controller = "event_ticket";

export const eventTicketController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      withHandler(({ body }) => createEventTicket(body.name)),
      {
        detail: { summary: "Create event ticket" },
        body: EventTicketModel,
      }
    )
    .get(
      "/",
      withHandler(() => getAllEventTicket()),
      {
        detail: { summary: "Get all event tickets" },
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getEventTicketById(params.id)),
      {
        detail: { summary: "Get event ticket by id" },
      }
    )
    .put(
      "/:id",
      withHandler(({ params, body }) => updateEventTicket(body, params.id)),
      {
        detail: { summary: "Update event ticket" },
        body: EventTicketModel,
      }
    )
    .delete(
      "/:id",
      withHandler(({ params }) => deleteEventTicket(params.id)),
      {
        detail: { summary: "Delete event ticket" },
      }
    )
);
