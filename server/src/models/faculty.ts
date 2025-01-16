import { t } from "elysia";

export const FacultyModel = t.Object({
  id: t.Optional(t.Number()),
  name: t.String(),
});

export type FacultyType = typeof FacultyModel.static;
