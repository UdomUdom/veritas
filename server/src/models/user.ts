import { t } from "elysia";

export const UserModel = t.Object({
  id: t.Optional(t.String()),
  username: t.String(),
  password: t.String(),
  information_id: t.Optional(t.String()),
});

export type UserType = typeof UserModel.static;
