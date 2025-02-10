import db from "@/db";
import * as table from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return await db.query.user.findMany({
    columns: {
      password: false,
      role_id: false,
      created_at: false,
      updated_at: false,
    },
    with: {
      role: true,
    },
  });
};

export const getUserById = async (id: string) => {
  const user = await db.query.user.findFirst({
    where: eq(table.user.id, id),
    columns: {
      password: false,
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
