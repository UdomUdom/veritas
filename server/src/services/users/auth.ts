import db from "@/db";
import { eq } from "drizzle-orm";
import { role, user } from "@/db/schema";
import { UserResetPasswordType, UserType } from "@/models/user";
import { errorSignup, handleResetPassword, handleSignup } from "@/libs/Auth";

export const signup = async (body: UserType) => {
  const result = await db.transaction(async (tx) => {
    const data = await handleSignup({
      email: body.email,
      password: body.password!,
    });

    const role_user = await tx.query.role.findFirst({
      where: eq(role.name, "user"),
    });

    if (!role_user) {
      await errorSignup(data.user!.id);
      throw new Error("Role not found");
    }

    const [created] = await tx
      .insert(user)
      .values({
        id: data.user!.id,
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phone: body.phone,
        gender: body.gender,
        birthdate: body.birthdate,
        avatar: body.avatar,
        role_id: role_user!.id,
      })
      .returning();

    if (!created) {
      await errorSignup(data.user!.id);
      throw new Error("User not created");
    }

    return created;
  });

  return { message: `User ${result.email} created`, data: null };
};

export const resetPassword = async (
  id: string,
  body: UserResetPasswordType
) => {
  const result = await db.query.user.findFirst({
    where: eq(user.id, id),
  });

  if (!result) throw new Error("User not found");

  const data = await handleResetPassword(
    result.email,
    body.currentPassword,
    body.newPassword
  );

  if (!data) throw new Error("Failed to update password");

  return { message: "Password updated", data: null };
};
