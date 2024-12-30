import { t } from "elysia";

export const DepartmentModel = t.Object({
  id: t.Number(),
  name: t.String(),
  faculty_id: t.Number(),
});

export type DepartmentType = typeof DepartmentModel.static;
