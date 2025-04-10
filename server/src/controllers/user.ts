import Elysia from "elysia";
import { signup } from "@/services/users/auth";
import { UserModel } from "@/models/user";
import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "@/services/users/user";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "user";

export const userController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/signup",
      async ({ body, error }) => {
        try {
          const { message, data } = await signup(body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Signup" },
        body: UserModel,
      }
    )
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const { message, data } = await getAllUser(query);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get all users" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await getUserById(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get user by id" },
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const { message, data } = await updateUser(params.id, body);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Update user" },
        body: UserModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await deleteUser(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Delete user" },
      }
    )
);
