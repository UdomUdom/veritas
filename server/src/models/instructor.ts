import { t } from "elysia";

export const InstructorModel = t.Object({
  firstname: t.String(),
  lastname: t.String(),
  bio: t.Optional(t.String()),
  avatar: t.Optional(t.String()),
});

export type InstructorType = typeof InstructorModel.static;
