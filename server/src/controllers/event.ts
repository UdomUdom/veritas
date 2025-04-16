import Elysia from "elysia";
import {
  getEventByCategory,
  getNewestEvent,
  getRandomEvent,
  getUpcomingEvent,
} from "@/services/events/get";
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  updateEvent,
} from "@/services/events";
import { EventModel } from "@/models/event";
import { QueryModel } from "@/models/query";
import { withHandler } from "@/utils/Control";
import { getTicketByEvent } from "@/services/events/ticket";

const controller = "event";

export const eventController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      withHandler(({ body }) => createEvent(body)),
      {
        detail: { summary: "Create event" },
        body: EventModel,
      }
    )
    .get(
      "/",
      withHandler(({ query }) => getAllEvent(query)),
      {
        detail: { summary: "Get all events" },
        query: QueryModel,
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getEventById(params.id)),
      {
        detail: { summary: "Get event by id" },
      }
    )
    .put(
      "/:id",
      withHandler(({ params, body }) => updateEvent(params.id, body)),
      {
        detail: { summary: "Update event" },
        body: EventModel,
      }
    )
    .delete(
      "/:id",
      withHandler(({ params }) => deleteEvent(params.id)),
      {
        detail: { summary: "Delete event" },
      }
    )
    .get(
      "/category/:name",
      withHandler(({ params }) => getEventByCategory(params.name)),
      {
        detail: { summary: "Get event by category" },
      }
    )
    .get(
      "/random",
      withHandler(({ query }) => getRandomEvent(query)),
      {
        detail: { summary: "Get random event" },
        query: QueryModel,
      }
    )
    .get(
      "/new",
      withHandler(({ query }) => getNewestEvent(query)),
      {
        detail: { summary: "Get new events" },
        query: QueryModel,
      }
    )
    .get(
      "/upcoming",
      withHandler(({ query }) => getUpcomingEvent(query)),
      {
        detail: { summary: "Get upcoming events" },
        query: QueryModel,
      }
    )
    .get(
      "/ticket/:id",
      withHandler(({ params }) => getTicketByEvent(params.id)),
      {
        detail: { summary: "Get ticket by event" },
      }
    )
);
