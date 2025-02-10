import { user } from "@/db/schema";
import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";

const _user = createInsertSchema(user);

export const UserSignUpModel = t.Omit(_user, [
  "id",
  "profile_id",
  "role_id",
  "status",
  "created_at",
  "updated_at",
]);

export type UserSignUpType = typeof UserSignUpModel.static;

export const UserSignInModel = t.Omit(_user, [
  "id",
  "profile_id",
  "role_id",
  "status",
  "created_at",
  "updated_at",
]);

export type UserSignInType = typeof UserSignInModel.static;
