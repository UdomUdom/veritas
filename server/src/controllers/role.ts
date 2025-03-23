import Elysia from "elysia";
import { getRole, getRoleById } from "@/services/role";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "role";

export const roleController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .get(
      "/",
      async ({ query, error }) => {
        try {
          const result = await getRole(query);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get all roles" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const result = await getRoleById(params.id);
          return SuccessHandler(result);
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "get role by id" },
      }
    )
);
