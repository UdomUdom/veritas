import db from "@/db";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import { QueryType } from "@/models/query";
import { UserType } from "@/models/user";

export const getAllUser = async ({ limit, offset }: QueryType) => {
  const result = await db.query.user.findMany({
    with: {
      role: true,
    },
    limit,
    offset,
  });

  return { message: "Get all users", data: result };
};

export const getUserById = async (id: string) => {
  const result = await db.query.user.findFirst({
    where: eq(user.id, id),
    with: {
      role: true,
    },
  });

  return { message: "Get user by id", data: result };
};

export const updateUser = async (id: string, body: UserType) => {
  const [result] = await db
    .update(user)
    .set(body)
    .where(eq(user.id, id))
    .returning();

  if (!result) throw new Error("User not found");

  return { message: `Update user ${result.email} success`, data: null };
};

export const deleteUser = async (id: string) => {
  const [result] = await db
    .update(user)
    .set({ deleted_at: new Date() })
    .where(eq(user.id, id))
    .returning();

  if (!result) throw new Error("User not found");

  return { message: `Delete user ${result.email} success`, data: null };
};
