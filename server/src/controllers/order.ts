import Elysia from "elysia";
import { placeOrder } from "@/services/orders/placeorder";
import { PlaceOrderModel } from "@/models/order";
import { withHandler } from "@/utils/Control";
import {
  checkoutCancel,
  checkoutConfirm,
  paymentOrder,
} from "@/services/orders/checkout";
import { getAllOrder, getOrderById } from "@/services/orders";
import { getOrderBarChart, getOrderByStatus } from "@/services/orders/status";

const controller = "order";

export const orderController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/placeorder",
      withHandler(({ body }) => placeOrder(body)),
      {
        detail: { summary: "Place Order" },
        body: PlaceOrderModel,
      }
    )
    .post(
      "/:id/checkout",
      withHandler(async ({ params, query }) => {
        switch (query.method) {
          case "confirm":
            return await checkoutConfirm(params.id);
          case "cancel":
            return await checkoutCancel(params.id);
          default:
            return { message: "Invalid method" };
        }
      }),
      {
        detail: { summary: "Checkout Order" },
      }
    )
    .post(
      "/:id/pay",
      withHandler(({ params }) => paymentOrder(params.id)),
      {
        detail: { summary: "Payment Order" },
      }
    )
    .get(
      "/",
      withHandler(() => getAllOrder()),
      {
        detail: { summary: "Get All Orders" },
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getOrderById(params.id)),
      {
        detail: { summary: "Get Order By ID" },
      }
    )
    .get(
      "/status/:status",
      withHandler(({ params }) => getOrderByStatus(params.status)),
      {
        detail: { summary: "Get Order By Status" },
      }
    )
    .get(
      "/chart/",
      withHandler(() => getOrderBarChart()),
      {
        detail: { summary: "Get Order Bar Chart" },
      }
    )
);
