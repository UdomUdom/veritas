import Elysia from "elysia";
import { userLogin, userRegister } from "@/services/users/user";
import { UserLoginModel, UserRegisterModel } from "@/models/user";
import { ErrorHandler } from "@/utils/ErrorHandler";

export const userController = new Elysia().group("/users", (app) =>
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
        body: UserRegisterModel,
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
        body: UserLoginModel,
      }
    )
);
