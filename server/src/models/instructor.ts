import { t } from "elysia";

export const InstructorModel = t.Object({
  firstname: t.String(),
  lastname: t.String(),
  bio: t.String(),
  avatar: t.String(),
});

export type InstructorType = typeof InstructorModel.static;
