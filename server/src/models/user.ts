import { t } from "elysia";

export const UserModel = t.Object({
  id: t.Number(),
  username: t.String(),
  email: t.String(),
  password: t.String(),
  role_id: t.Number(),
  department_id: t.Number(),
});

export const UserRegisterModel = t.Object({
  username: t.String(),
  email: t.String(),
  password: t.String(),
});

export const UserLoginModel = t.Object({
  email: t.String(),
  password: t.String(),
});

export type UserType = typeof UserModel.static;
export type UserRegisterType = typeof UserRegisterModel.static;
export type UserLoginType = typeof UserLoginModel.static;
