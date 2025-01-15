import { t } from "elysia";

export const StudentModel = t.Object({
  user_id: t.Number(),
  enrollment_year: t.String(),
  graduation_year: t.String(),
});

export type StudentType = typeof StudentModel.static;
