import { t } from "elysia";

export const UserModel = t.Object({
  firstname: t.String(),
  lastname: t.String(),
  email: t.String(),
  password: t.Optional(t.String()),
  phone: t.Optional(t.String()),
  gender: t.Optional(t.String()),
  birthdate: t.Optional(t.String()),
  avatar: t.Optional(t.String()),
  role_id: t.Optional(t.String()),
});

export type UserType = typeof UserModel.static;

export const UserResetPasswordModel = t.Object({
  currentPassword: t.String(),
  newPassword: t.String(),
});

export type UserResetPasswordType = typeof UserResetPasswordModel.static;
