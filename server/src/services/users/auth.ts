import db from "@/db";
import { eq } from "drizzle-orm";
import { role, user } from "@/db/schema";
import { UserType } from "@/models/user";
import { errorSignup, handleSignup } from "@/libs/Auth";

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
        id: data.user!.id,
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

    if (!created) {
      await errorSignup(data.user!.id);
      throw new Error("User not created");
    }

    return created;
  });

  return { message: `User ${result.email} created`, data: null };
};
