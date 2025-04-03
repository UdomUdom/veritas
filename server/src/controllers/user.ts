import Elysia from "elysia";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";
import { signup } from "@/services/users/auth";
import { UserModel } from "@/models/user";
import { getAllUsers, getUserById } from "@/services/users/user";

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
        detail: { summary: "signup" },
        body: UserModel,
      }
    )
    .get(
      "/",
      async ({ error }) => {
        try {
          const { message, data } = await getAllUsers();
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get all users" },
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
        detail: { summary: "get user by id" },
      }
    )
);
