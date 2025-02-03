import Elysia from "elysia";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { upgradeRegister, userRegister } from "@/services/users/register";
import { LoginModel, RegisterModel, UpgradeRegisterModel } from "@/models/user";
import { userLogin } from "@/services/users/login";
import { generateToken } from "@/utils/Auth";
import { isAdmin } from "@/middlewares";

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
          return { status: "ok", username: result.username };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "register user",
        },
        body: RegisterModel,
      }
    )
    .post(
      "/login",
      async ({ body, set, cookie: { session } }) => {
        try {
          const result = await userLogin(body);
          set.status = 200;
          session.value = generateToken({
            id: result.id,
            role: result.role,
          });
          return { status: "ok", message: "Login success" };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "login",
        },
        body: LoginModel,
      }
    )
    .post(
      "/logout",
      async ({ cookie: { session } }) => {
        try {
          session.remove();
          return { status: "ok", message: "Logout success" };
        } catch (error) {
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "logout",
        },
      }
    )
    .post(
      "/register/student/:id",
      async ({ params, set }) => {
        try {
          const result = await upgradeRegister("student", params.id);
          set.status = 201;
          return { status: "ok", number: result.number };
        } catch (error) {
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "user to student",
        },
        beforeHandle: isAdmin,
      }
    )
    .post(
      "/register/instructor/:id",
      async ({ body, params, set }) => {
        try {
          const result = await upgradeRegister("instructor", params.id, body);
          set.status = 201;
          return { status: "ok", number: result.number };
        } catch (error) {
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "user to instructor",
        },
        beforeHandle: isAdmin,
        body: UpgradeRegisterModel,
      }
    )
);
