import db from "@/db";
import { eq } from "drizzle-orm";
import { role, user } from "@/db/schema";
import { UserType } from "@/models/user";
import { handleSignup } from "@/libs/Auth";

export const signup = async (body: UserType) => {
  const result = await db.transaction(async (tx) => {
    const data = await handleSignup({
      email: body.email,
      password: body.password,
    });

    const role_user = await tx.query.role.findFirst({
      where: eq(role.name, "user"),
    });

    const [created] = await tx
      .insert(user)
      .values({
        auth_id: data.user!.id,
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        tel: body.tel,
        gender: body.gender,
        birthdate: body.birthdate,
        avatar: body.avatar,
        role_id: role_user!.id,
      })
      .returning();

    return created;
  });

  return `User ${result.email} created`;
};
