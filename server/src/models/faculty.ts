import { t } from "elysia";

export const FacultyModel = t.Object({
  name: t.String(),
});

export type FacultyType = typeof FacultyModel.static;
