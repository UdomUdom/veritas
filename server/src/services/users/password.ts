import db from "@/db";
import { eq } from "drizzle-orm";
import { profile, user } from "@/db/schema";
import { ResetPasswordType } from "@/models/users";
import { hashPassword } from "@/utils/Hash";

export const resetPassword = async (body: ResetPasswordType) => {
  return await db.transaction(async (tx) => {
    const found = await tx.query.profile.findFirst({
      where: eq(profile.email, body.email),
    });

    if (!found) throw new Error("Profile not found");

    const profile_user = await tx.query.user.findFirst({
      where: eq(user.profile_id, found.id),
    });

    if (!profile_user) throw new Error("User not found");

    await tx
      .update(user)
      .set({
        password: await hashPassword(body.new_password),
      })
      .where(eq(user.id, profile_user.id));

    return "Password reset success";
  });
};
