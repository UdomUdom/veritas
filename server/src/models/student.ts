import { t } from "elysia";

export const StudentModel = t.Object({
  id: t.Number(),
  user_id: t.Number(),
  number: t.String(),
  enrollment_year: t.Date(),
  graduation_year: t.Date(),
});

export type StudentType = typeof StudentModel.static;
