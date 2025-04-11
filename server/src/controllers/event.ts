import Elysia from "elysia";
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  getNewestEvent,
  getRandomEvent,
  getUpcomingEvent,
  updateEvent,
} from "@/services/events/event";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";
import { EventModel } from "@/models/event";
import { QueryModel } from "@/models/query";

const controller = "event";

export const eventController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const { message, data } = await createEvent(body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Create event" },
        body: EventModel,
      }
    )
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const { message, data } = await getAllEvent(query);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get all events" },
        query: QueryModel,
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await getEventById(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get event by id" },
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const { message, data } = await updateEvent(params.id, body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Update event" },
        body: EventModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await deleteEvent(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Delete event" },
      }
    )
    .get("/random", async ({ query, error }) => {
      try {
        const { message, data } = await getRandomEvent(query);
        return SuccessHandler({ message, data });
      } catch (err) {
        return error(400, ErrorHandler(err));
      }
    })
    .get(
      "/new",
      async ({ query, error }) => {
        try {
          const { message, data } = await getNewestEvent(query);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get new events" },
        query: QueryModel,
      }
    )
    .get(
      "/upcoming",
      async ({ query, error }) => {
        try {
          const { message, data } = await getUpcomingEvent(query);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get upcoming events" },
        query: QueryModel,
      }
    )
);
