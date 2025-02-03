import { t } from "elysia";

export const RegisterModel = t.Object({
  firstname: t.String(),
  lastname: t.String(),
  email: t.String(),
  date_of_birth: t.Date(),
  gender: t.String(),
  phone_number: t.String(),
  address: t.String(),
  username: t.String(),
  password: t.String(),
});

export type RegisterType = typeof RegisterModel.static;

export const LoginModel = t.Object({
  username: t.String(),
  password: t.String(),
});

export type LoginType = typeof LoginModel.static;

export const UpgradeRegisterModel = t.Object({
  hire_date: t.Date(),
  department_id: t.Number(),
});

export type UpgradeRegisterType = typeof UpgradeRegisterModel.static;
