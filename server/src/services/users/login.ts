import db from "@/db";
import { user } from "@/db/schema";
import { LoginType } from "@/models/users";
import { verifyPassword } from "@/utils/Hash";
import { eq } from "drizzle-orm";

export const userLogin = async (body: LoginType) => {
  return await db.transaction(async (tx) => {
    const found = await tx.query.user.findFirst({
      where: eq(user.username, body.username.toLowerCase()),
      with: {
        role: true,
      },
    });

    if (!found) throw new Error("User not found");

    if (!(await verifyPassword(body.password, found.password)))
      throw new Error("Invalid password");

    return { id: found.id, role: found.role.name };
  });
};
