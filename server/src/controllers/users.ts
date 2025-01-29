import Elysia from "elysia";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { ProfileModel } from "@/models/profile";
import { userRegister } from "@/services/users/register";

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
          const result = await userRegister(body);
          set.status = 201;
          return { status: "ok" };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "register",
        },
        body: ProfileModel,
      }
    )
    .post("/login", async ({ body, set, cookie: { session } }) => {
      try {
        session.value = "secret";
        return { status: "ok", message: "Login success" };
      } catch (error) {
        set.status = 400;
        return ErrorHandler(error);
      }
    })
    .post("/logout", async ({ cookie: { session } }) => {
      try {
        session.remove();
        return { status: "ok", message: "Logout success" };
      } catch (error) {
        return ErrorHandler(error);
      }
    })
);
