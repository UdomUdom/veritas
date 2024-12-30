import { t } from "elysia";

const ProfileModel = t.Object({
  id: t.Number(),
  user_id: t.Number(),
  firstname: t.String(),
  lastname: t.String(),
  bio: t.String(),
  birthday: t.Date(),
  gender: t.String(),
  phone: t.String(),
  address: t.String(),
  picture: t.String(),
});

export type ProfileType = typeof ProfileModel.static;
