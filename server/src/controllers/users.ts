import Elysia from "elysia";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { upgradeRegister, userRegister } from "@/services/users/register";
import {
  LoginModel,
  RegisterModel,
  ResetPasswordModel,
  UpgradeRegisterModel,
} from "@/models/users";
import { userLogin } from "@/services/users/login";
import { generateToken } from "@/utils/Token";
import { isAuthenticated } from "@/middlewares";
import { getUserById, getUsers } from "@/services/users";
import { resetPassword } from "@/services/users/password";

export const userController = new Elysia({
  detail: {
    tags: ["users"],
  },
}).group("users", (app) =>
  app
    .post(
      "/register",
      async ({ body, error }) => {
        try {
          const result = await userRegister(body);
          return { status: "ok", username: result.username };
        } catch (err) {
          return error(400, ErrorHandler(err));
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
      async ({ body, cookie: { session }, error }) => {
        try {
          const result = await userLogin(body);
          session.value = generateToken({
            id: result.id,
            role: result.role,
          });
          return { status: "ok", message: "Login success" };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "login",
        },
        body: LoginModel,
      }
    )
    .put(
      "/reset-password",
      async ({ body, error }) => {
        try {
          const result = await resetPassword(body);
          return { status: "ok", message: result };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "reset password",
        },
        beforeHandle: (ctx) => isAuthenticated(ctx),
        body: ResetPasswordModel,
      }
    )
    .post(
      "/logout",
      async ({ cookie: { session }, error }) => {
        try {
          session.remove();
          return { status: "ok", message: "Logout success" };
        } catch (err) {
          return error(400, ErrorHandler(err));
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
      async ({ params, headers: { permission }, error }) => {
        try {
          if (permission !== "admin") throw new Error("Permission denied");
          const result = await upgradeRegister("student", params.id);
          return { status: "ok", number: result.number };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "user to student",
        },
        beforeHandle: (ctx) => isAuthenticated(ctx),
      }
    )
    .post(
      "/register/instructor/:id",
      async ({ body, params, headers, error }) => {
        try {
          if (headers["permission"] !== "admin")
            throw new Error("Permission denied");
          const result = await upgradeRegister("instructor", params.id, body);
          return { status: "ok", number: result.number };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "user to instructor",
        },
        beforeHandle: (ctx) => isAuthenticated(ctx),
        body: UpgradeRegisterModel,
      }
    )
    .get(
      "/me",
      async ({ headers, error }) => {
        try {
          const id = headers["authorization"]?.split(" ")[1] as string;
          const result = await getUserById(id);
          return { status: "ok", data: result };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "get user profile",
        },
        beforeHandle: (ctx) => isAuthenticated(ctx),
      }
    )
    .get(
      "/",
      async ({ error }) => {
        try {
          const result = await getUsers();
          return { status: "ok", data: result };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "get all users",
        },
        beforeHandle: (ctx) => isAuthenticated(ctx),
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          if (!params.id) throw new Error("Invalid id");
          const result = await getUserById(params.id);
          return { status: "ok", data: result };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: {
          summary: "get user by id",
        },
        beforeHandle: (ctx) => isAuthenticated(ctx),
      }
    )
);
