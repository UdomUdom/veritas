import Elysia, { t } from "elysia";
import { withHandler } from "@/utils/Control";
import { orderWebhook } from "@/services/webhook/order";

const controller = "webhook";

export const webhookController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app.post(
    "/order",
    withHandler((context) => orderWebhook(context)),
    {
      detail: { summary: "Order Webhook" },
    }
  )
);
