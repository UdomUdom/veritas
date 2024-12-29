import { t } from "elysia";

export const RoleModel = t.Object({
  id: t.Number(),
  name: t.String(),
});

export type RoleType = typeof RoleModel.static;
