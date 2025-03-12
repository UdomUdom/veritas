import { t } from "elysia";

export const UserAuthModel = t.Object({
  email: t.String(),
  password: t.String(),
});

export type UserAuthType = typeof UserAuthModel.static;

export const UserProfileModel = t.Object({
  username: t.String(),
  email: t.String(),
  role_id: t.String(),
  status: t.String(),
  avartar: t.String(),
});

export type UserProfileType = typeof UserProfileModel.static;
