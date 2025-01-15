import { t } from "elysia";

export const informationsModel = t.Object({
  user_id: t.Number(),
  firstname: t.String(),
  lastname: t.String(),
  email: t.String(),
  phone: t.String(),
  gender: t.String(),
  birthdate: t.Date(),
  address: t.String(),
  status: t.String(),
  bio: t.String(),
  picture: t.String(),
  role_id: t.Number(),
  department_id: t.Number(),
});

export type informationsType = typeof informationsModel.static;
