import { t } from "elysia";

export const InstructorModel = t.Object({
  user_id: t.Number(),
  hire_date: t.Date(),
  salary: t.Number(),
  academic_degree: t.String(),
});

export type InstructorType = typeof InstructorModel.static;
