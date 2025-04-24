import Elysia from "elysia";
import { resetPassword, signup } from "@/services/users/auth";
import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "@/services/users";
import { UserModel, UserResetPasswordModel } from "@/models/user";
import { withHandler } from "@/utils/Control";
import {
  getOrderByUserId,
  getOrderToPayByUserId,
} from "@/services/users/order";
import { getTicketById } from "@/services/users/ticket";

const controller = "user";

export const userController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/signup",
      withHandler(({ body }) => signup(body)),
      {
        detail: { summary: "Signup" },
        body: UserModel,
      }
    )
    .put(
      "/:id/reset-password",
      withHandler(({ params, body }) => resetPassword(params.id, body)),
      {
        detail: { summary: "Change password" },
        body: UserResetPasswordModel,
      }
    )
    .get(
      "/",
      withHandler(({ query }) => getAllUser(query)),
      {
        detail: { summary: "Get all users" },
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getUserById(params.id)),
      {
        detail: { summary: "Get user by id" },
      }
    )
    .put(
      "/:id",
      withHandler(({ params, body }) => updateUser(params.id, body)),
      {
        detail: { summary: "Update user" },
        body: UserModel,
      }
    )
    .delete(
      "/:id",
      withHandler(({ params }) => deleteUser(params.id)),
      {
        detail: { summary: "Delete user" },
      }
    )
    .get(
      "/:id/order",
      withHandler(({ params }) => getOrderByUserId(params.id)),
      {
        detail: { summary: "Get order by user id" },
      }
    )
    .get(
      "/:id/ticket",
      withHandler(({ params }) => getTicketById(params.id)),
      {
        detail: { summary: "Get ticket by user id" },
      }
    )
    .get(
      "/:id/order/to-pay",
      withHandler(({ params }) => getOrderToPayByUserId(params.id)),
      {
        detail: { summary: "Get Order By Status" },
      }
    )
);
