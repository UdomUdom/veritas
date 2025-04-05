import { t } from "elysia";

export const OrganizerModel = t.Object({
  name: t.Optional(t.String()),
  image: t.Optional(t.String()),
  email: t.Optional(t.String()),
  phone: t.Optional(t.String()),
  website: t.Optional(t.String()),
});

export type OrganizerType = typeof OrganizerModel.static;
