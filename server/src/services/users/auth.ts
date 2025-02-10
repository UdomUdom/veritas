import db from "@/db";
import * as table from "@/db/schema";
import { UserSignUpType, UserSignInType } from "@/models/users";
import { hashPassword, verifyPassword } from "@/utils/Hash";
import { eq } from "drizzle-orm";

export const signup = async (body: UserSignUpType) => {
  const result = await db.transaction(async (tx) => {
    const already = await tx.query.user.findFirst({
      where: eq(table.user.username, body.username),
    });

    if (already) throw new Error("User already exists");

    const role_user = await tx.query.role.findFirst({
      where: eq(table.role.name, "user"),
    });

    const [new_user] = await tx
      .insert(table.user)
      .values({
        username: body.username,
        password: await hashPassword(body.password),
        status: "active",
        role_id: role_user?.id,
      })
      .returning();

    return new_user;
  });
  return result;
};

export const signin = async (body: UserSignInType) => {
  const result = await db.transaction(async (tx) => {
    const already = await tx.query.user.findFirst({
      where: eq(table.user.username, body.username),
    });

    if (!already) throw new Error("User not found");

    const isPasswordMatch = await verifyPassword(
      body.password,
      already.password
    );

    if (!isPasswordMatch) throw new Error("Password not match");

    return already;
  });

  return result;
};
