import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return await db.query.user.findMany({
    columns: {
      profile_id: false,
      password: false,
      role_id: false,
      created_at: false,
      updated_at: false,
    },
    with: {
      profile: {
        columns: {
          created_at: false,
          updated_at: false,
        },
      },
      role: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await db.query.user.findMany({
    where: eq(user.id, id),
    columns: {
      profile_id: false,
      password: false,
      role_id: false,
      created_at: false,
      updated_at: false,
    },
    with: {
      profile: {
        columns: {
          created_at: false,
          updated_at: false,
        },
      },
      role: true,
    },
  });
};
