import Elysia from "elysia";
import { RoleModel } from "@/models/role";
import {
  createRole,
  deleteRole,
  getAllRole,
  getRoleById,
  updateRole,
} from "@/services/roles/role";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "Role";

export const roleController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      async ({ body, error }) => {
        try {
          const { message, data } = await createRole(body.name);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Create role" },
        body: RoleModel,
      }
    )
    .get(
      "/",
      async ({ error }) => {
        try {
          const { message, data } = await getAllRole();
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get all roles" },
      }
    )
    .get(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await getRoleById(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Get role by id" },
      }
    )
    .put(
      "/:id",
      async ({ params, body, error }) => {
        try {
          const { message, data } = await updateRole(params.id, body.name);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Update role" },
        body: RoleModel,
      }
    )
    .delete(
      "/:id",
      async ({ params, error }) => {
        try {
          const { message, data } = await deleteRole(params.id);
          return SuccessHandler({ message, data });
        } catch (err) {
          return error(400, ErrorHandler(err));
        }
      },
      {
        detail: { summary: "Delete role" },
      }
    )
);
