import Elysia from "elysia";
import { isAuthorized } from "@/middlewares";
import { UserAuthModel } from "@/models/users";
import { signin, signup } from "@/services/users/auth";
import { getUserProfile, getUserById, getUsers } from "@/services/users/users";
import { ErrorHandler } from "@/utils/ErrorHandler";

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
            data: result.email,
          };
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
      async ({ body, cookie: { access_token }, error }) => {
        try {
          const result = await signin(body);
          access_token.value = result.session.access_token;
          return {
            status: "ok",
            data: result.user.email,
          };
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "signin" },
        body: UserAuthModel,
      }
    )
    // .post(
    //   "/reset-password",
    //   async ({ body, error }) => {
    //     try {
    //       const result = await resetPassword(body);
    //       return {
    //         status: "ok",
    //         data: result,
    //       };
    //     } catch (err) {
    //       return error(400, ErrorHandler(err));
    //     }
    //   },
    //   {
    //     detail: { summary: "reset password" },
    //     body: UserAuthModel,
    //   }
    // )
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
          const result = await getUserProfile(headers["authorization"]);
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
