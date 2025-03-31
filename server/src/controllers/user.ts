import Elysia from "elysia";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";
import { signup } from "@/services/users/auth";
import { UserModel } from "@/models/user";

const controller = "user";

export const userController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app.post(
    "/signup",
    async ({ body, error }) => {
      try {
        const result = await signup(body);
        return SuccessHandler(result);
      } catch (err) {
        return error(400, ErrorHandler(err));
      }
    },
    {
      detail: { summary: "signup" },
      body: UserModel,
    }
  )
);
