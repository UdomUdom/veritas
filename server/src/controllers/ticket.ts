import Elysia from "elysia";
import { withHandler } from "@/utils/Control";
import { getTicketById } from "@/services/tickets";

const controller = "ticket";

export const ticketController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app.get(
    "/:id",
    withHandler(({ params }) => getTicketById(params.id)),
    {
      detail: { summary: "Get ticket by id" },
    }
  )
);
