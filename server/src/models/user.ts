import { t } from "elysia";

export const UserAuthModel = t.Object({
  username: t.String(),
  email: t.String(),
  password: t.String(),
});

export type UserAuthType = typeof UserAuthModel.static;

export const UserProfileModel = t.Object({
  username: t.Optional(t.String()),
  email: t.Optional(t.String()),
  role_id: t.Optional(t.String()),
  status: t.Optional(t.String()),
  avatar: t.Optional(t.String()),
});

export type UserProfileType = typeof UserProfileModel.static;
