import { t } from "elysia";

export const UserAuthModel = t.Object({
  email: t.String(),
  password: t.String(),
});

export type UserAuthType = typeof UserAuthModel.static;
