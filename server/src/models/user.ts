import { t } from "elysia";

export const UserModel = t.Object({
  username: t.String(),
  password: t.String(),
});

export type UserType = typeof UserModel.static;
