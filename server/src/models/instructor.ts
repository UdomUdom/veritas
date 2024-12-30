import { t } from "elysia";

export const InstructorModel = t.Object({
  id: t.Number(),
  user_id: t.Number(),
  number: t.String(),
  hire_date: t.Date(),
});

export type InstructorType = typeof InstructorModel.static;
