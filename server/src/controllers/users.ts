import Elysia from "elysia";
import { userLogin, userRegister } from "@/services/users/user";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { informationsModel } from "@/models/informations";
import { UserModel } from "@/models/user";

export const userController = new Elysia({
  detail: {
    tags: ["users"],
  },
}).group("users", (app) =>
  app
    .post(
      "/register",
      async ({ body, set }) => {
        try {
          const user = await userRegister(body);
          return { user };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        body: informationsModel,
      }
    )
    .post(
      "/login",
      async ({ body, set }) => {
        try {
          const user = await userLogin(body);
          return { user };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        body: UserModel,
      }
    )
);
