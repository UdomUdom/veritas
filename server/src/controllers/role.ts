import Elysia from "elysia";
import {
  createRole,
  deleteRole,
  getAllRole,
  getRoleById,
  updateRole,
} from "@/services/roles";
import { RoleModel } from "@/models/role";
import { withHandler } from "@/utils/Control";

const controller = "role";

export const roleController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .post(
      "/",
      withHandler(({ body }) => createRole(body.name)),
      {
        detail: { summary: "Create role" },
        body: RoleModel,
      }
    )
    .get(
      "/",
      withHandler(() => getAllRole()),
      {
        detail: { summary: "Get all roles" },
      }
    )
    .get(
      "/:id",
      withHandler(({ params }) => getRoleById(params.id)),
      {
        detail: { summary: "Get role by id" },
      }
    )
    .put(
      "/:id",
      withHandler(({ params, body }) => updateRole(params.id, body.name)),
      {
        detail: { summary: "Update role" },
        body: RoleModel,
      }
    )
    .delete(
      "/:id",
      withHandler(({ params }) => deleteRole(params.id)),
      {
        detail: { summary: "Delete role" },
      }
    )
);
