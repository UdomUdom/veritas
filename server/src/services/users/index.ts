import db from "@/db";
import * as table from "@/db/schema";
import { UserProfileType } from "@/models/users";
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
  const user = await db
    .update(table.user)
    .set({
      username: body.username || undefined,
      email: body.email || undefined,
      role_id: body.role_id || undefined,
      status: body.status as "active" | "inactive",
      avartar: body.avartar || undefined,
    })
    .where(eq(table.user.id, id));

  if (!user) throw new Error("User not found");

  return user;
};
