import { t } from "elysia";

export const RoleModel = t.Object({
  name: t.String(),
});

export type RoleType = typeof RoleModel.static;
