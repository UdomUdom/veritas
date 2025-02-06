import Elysia from "elysia";
import { ErrorHandler } from "@/utils/ErrorHandler";
import { getRoles } from "@/services/roles";
import { isAuthenticated } from "@/middlewares";

export const roleController = new Elysia({
  detail: {
    tags: ["roles"],
  },
}).group("roles", (app) =>
  app.get(
    "/",
    async ({ error }) => {
      try {
        const result = await getRoles();
        return result;
      } catch (err) {
        return error(400, ErrorHandler(err));
      }
    },
    {
      detail: {
        summary: "get all roles",
      },
      beforeHandle: (ctx) => isAuthenticated(ctx),
    }
  )
);
