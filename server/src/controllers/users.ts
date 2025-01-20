import Elysia from "elysia";
import {
  approveInstructor,
  approveStudent,
  userLogin,
  userRegistration,
  userResetPassword,
} from "@/services/users/user";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { UserModel } from "@/models/user";
import { InstructorModel } from "@/models/instructor";
import { InformationsModel } from "@/models/information";

export const userController = new Elysia({
  detail: {
    tags: ["users"],
  },
}).group("users", (app) =>
  app
    .post(
      "/registration",
      async ({ body, set }) => {
        try {
          const result = await userRegistration(body);
          set.status = 201;
          return { status: "ok", message: "User created", id: result.id };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "registration",
        },
        body: InformationsModel,
      }
    )
    .post(
      "/approve/student/:id",
      async ({ params, set }) => {
        try {
          const result = await approveStudent(params.id);
          return { status: "ok", message: "User approved", id: result.id };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "approve student",
        },
      }
    )
    .post(
      "/approve/instructor/:id",
      async ({ params, body, set }) => {
        try {
          const result = await approveInstructor(params.id, body);
          return { status: "ok", message: "User approved", id: result.id };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "approve instructor",
        },
        body: InstructorModel,
      }
    )
    .post(
      "/login",
      async ({ body, set, cookie: { token } }) => {
        try {
          const result = await userLogin(body);
          token.value = result.token;
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
        body: UserModel,
      }
    )
    .post(
      "/logout",
      async ({ cookie: { token } }) => {
        token.remove();
        return { status: "ok", message: "Logout success" };
      },
      {
        detail: {
          summary: "logout",
        },
      }
    )
    .post(
      "/reset/password",
      async ({ body, set }) => {
        try {
          await userResetPassword(body);
          return { status: "ok", message: "Password reset success" };
        } catch (error) {
          set.status = 400;
          return ErrorHandler(error);
        }
      },
      {
        detail: {
          summary: "reset password",
        },
        body: UserModel,
      }
    )
);
