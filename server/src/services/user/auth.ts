import db from "@/db";
import { role, user } from "@/db/schema";
import { UserAuthType } from "@/models/user";
import { handleRefreshToken, handleSignin, handleSignup } from "@/utils/Auth";
import { eq } from "drizzle-orm";

export const signup = async (body: UserAuthType) => {
  const result = await db.transaction(async (tx) => {
    const existing = await tx.query.user.findFirst({
      where: eq(user.email, body.email),
    });

    if (existing) throw new Error("Email already exists");

    const role_user = await tx.query.role.findFirst({
      where: eq(role.name, "user"),
    });

    const data = await handleSignup({
      email: body.email,
      password: body.password,
    });

    const [created] = await tx
      .insert(user)
      .values({
        auth_id: data.user!.id,
        username: body.username,
        email: body.email,
        role_id: role_user!.id,
        status: "active",
      })
      .returning();

    return created;
  });

  return result;
};

export const signin = async (body: UserAuthType) => {
  const data = await handleSignin({
    email: body.email,
    password: body.password,
  });

  return data;
};

export const refreshToken = async (refresh_token: string) => {
  const data = await handleRefreshToken(refresh_token);

  return data;
};
