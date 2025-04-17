import Elysia from "elysia";
import { signup } from "@/services/users/auth";
import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "@/services/users";
import { UserModel } from "@/models/user";
import { withHandler } from "@/utils/Control";
import { getOrderByUserId } from "@/services/users/order";

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
      "/order/:id",
      withHandler(({ params }) => getOrderByUserId(params.id)),
      {
        detail: { summary: "Get order by user id" },
      }
    )
);
