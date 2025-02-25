import Elysia from "elysia";
import { isAuthorized } from "@/middlewares";
import { UserAuthModel } from "@/models/users";
import { refreshToken, signin, signup } from "@/services/users/auth";
import { getUserProfile, getUserById, getUsers } from "@/services/users/users";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

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
          return SuccessHandler(`User ${result.email} created`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "signup" },
        body: UserAuthModel,
      }
    )
    .post(
      "/signin",
      async ({ body, cookie: { access_token, refresh_token }, error }) => {
        try {
          const result = await signin(body);
          access_token.value = result.session.access_token;
          refresh_token.value = result.session.refresh_token;
          return SuccessHandler(`User ${result.user.email} signed in`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "signin" },
        body: UserAuthModel,
      }
    )
    .get(
      "/profile",
      async ({ headers, error }) => {
        try {
          if (!headers["authorization"]) throw new Error("Unauthorized");
          const result = await getUserProfile(headers["authorization"]);
          return SuccessHandler(result);
        } catch (err) {
          return error(403, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get user profile" },
        beforeHandle: (ctx) => isAuthorized(ctx),
      }
    )
    .get(
      "/refresh",
      async ({ headers, cookie: { refresh_token }, error }) => {
        try {
          if (!headers["refresh_token"]) throw new Error("refresh_token");
          const result = await refreshToken(headers["refresh_token"]!);
          refresh_token.value = result.session?.refresh_token;
          return SuccessHandler(`Token refreshed`);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "refresh token" },
        beforeHandle: (ctx) => isAuthorized(ctx),
      }
    )
    .get(
      "/",
      async ({ error }) => {
        try {
          const result = await getUsers();
          return SuccessHandler(result);
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
      async ({ params: { id }, error }) => {
        try {
          const result = await getUserById(id);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get user by id" },
      }
    )
);
