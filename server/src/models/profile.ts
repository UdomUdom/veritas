import { t } from "elysia";

export const ProfileModel = t.Object({
  firstname: t.String(),
  lastname: t.String(),
  email: t.String(),
  date_of_birth: t.Date(),
  gender: t.String(),
  phone_number: t.String(),
  address: t.String(),
  bio: t.Optional(t.String()),
  picture: t.Optional(t.String()),
});

export type ProfileType = typeof ProfileModel.static;
