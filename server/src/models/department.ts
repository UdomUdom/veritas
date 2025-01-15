import { t } from "elysia";

export const DepartmentModel = t.Object({
  name: t.String(),
  role_id: t.Number(),
  faculty_id: t.Number(),
});

export type DepartmentType = typeof DepartmentModel.static;
