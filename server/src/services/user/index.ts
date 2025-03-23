import db from "@/db";
import * as table from "@/db/schema";
import { UserProfileType } from "@/models/user";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  const result = await db.query.user.findMany({
    columns: {
      auth_id: false,
      role_id: false,
      created_at: false,
      updated_at: false,
    },
    with: {
      role: true,
    },
  });

  return result;
};

export const getUserById = async (id: string) => {
  const user = await db.query.user.findFirst({
    where: eq(table.user.id, id),
    columns: {
      auth_id: false,
      role_id: false,
      created_at: false,
      updated_at: false,
    },
    with: {
      role: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const getUserProfile = async (auth_id: string) => {
  const user = await db.query.user.findFirst({
    where: eq(table.user.auth_id, auth_id),
    columns: {
      auth_id: false,
      role_id: false,
      created_at: false,
      updated_at: false,
    },
    with: {
      role: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const updateUser = async (id: string, body: UserProfileType) => {
  const result = await db.transaction(async (tx) => {
    const [updated] = await tx
      .update(table.user)
      .set({
        username: body.username || undefined,
        email: body.email || undefined,
        role_id: body.role_id || undefined,
        status: body.status as "active" | "inactive",
        avatar: body.avatar || undefined,
      })
      .where(eq(table.user.id, id))
      .returning();

    if (!updated) throw new Error("Failed to update user");

    return updated;
  });

  return result;
};

export const deleteUser = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const [deleted] = await tx
      .delete(table.user)
      .where(eq(table.user.id, id))
      .returning();

    if (!deleted) throw new Error("Failed to delete user");
  });

  return result;
};
