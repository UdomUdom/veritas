import { isAuthorized } from "@/middlewares";
import { UserSignInModel, UserSignUpModel } from "@/models/users";
import { signin, signup } from "@/services/users/auth";
import { getUserById, getUsers } from "@/services/users/users";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { generateToken } from "@/utils/Token";
import Elysia from "elysia";

export const userController = new Elysia({
  detail: {
    tags: ["users"],
  },
}).group("users", (app) =>
  app
    .post(
      "/signup",
      async ({ body, error }) => {
        try {
          const result = await signup(body);
          return {
            status: "ok",
            data: result.username,
          };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "signup" },
        body: UserSignUpModel,
      }
    )
    .post(
      "/signin",
      async ({ body, cookie: { session }, error }) => {
        try {
          const result = await signin(body);
          session.value = generateToken({
            id: result.id,
          });
          return {
            status: "ok",
            data: result.username,
          };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "signin" },
        body: UserSignInModel,
      }
    )
    .post(
      "/signout",
      async ({ cookie: { session }, error }) => {
        try {
          session.remove();
          return {
            status: "ok",
            data: "Signout success",
          };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "signout" },
      }
    )
    .get(
      "/",
      async ({ error }) => {
        try {
          const result = await getUsers();
          return {
            status: "ok",
            data: result,
          };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "all users" },
      }
    )
    .get(
      "/:id",
      async ({ params: { id }, error }) => {
        try {
          const result = await getUserById(id);
          return {
            status: "ok",
            data: result,
          };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "user by id" },
      }
    )
    .get(
      "/profile",
      async ({ headers, error }) => {
        try {
          if (!headers["authorization"]) throw new Error("Unauthorized");
          const result = await getUserById(headers["authorization"]);
          return {
            status: "ok",
            data: result,
          };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "profile" },
        beforeHandle: (ctx) => isAuthorized(ctx),
      }
    )
);
