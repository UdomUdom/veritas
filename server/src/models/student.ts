import { t } from "elysia";

export const StudentModel = t.Object({
  id: t.Optional(t.String()),
  user_id: t.Optional(t.String()),
  enrollment_year: t.Optional(t.String()),
  graduation_year: t.Optional(t.String()),
});

export type StudentType = typeof StudentModel.static;
