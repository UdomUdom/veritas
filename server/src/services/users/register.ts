import db from "@/db";
import { profile } from "@/db/schema";
import { ProfileType } from "@/models/profile";
import { eq } from "drizzle-orm";

export const userRegister = async (body: ProfileType) => {
  return await db.transaction(async (tx) => {
    const alreadyExists = await tx.query.profile.findFirst({
      where: eq(profile.email, body.email),
    });

    if (alreadyExists) throw new Error("User already exist");

    const [user] = await tx
      .insert(profile)
      .values({
        ...body,
        firstname: body.firstname.toLowerCase(),
        lastname: body.lastname.toLowerCase(),
        email: body.email.toLowerCase(),
        date_of_birth: body.date_of_birth.toISOString(),
        status: "active",
      })
      .returning();

    return user;
  });
};
