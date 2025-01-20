import { t } from "elysia";

export const InformationsModel = t.Object({
  firstname: t.String(),
  lastname: t.String(),
  email: t.String(),
  phone: t.String(),
  gender: t.String(),
  birthday: t.Date(),
  address: t.String(),
  bio: t.Optional(t.String()),
  picture: t.Optional(t.String()),
  role_id: t.Number(),
  department_id: t.Number(),
});

export type InformationsType = typeof InformationsModel.static;
