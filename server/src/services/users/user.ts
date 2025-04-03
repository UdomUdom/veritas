import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  const result = await db.query.user.findMany({
    with: {
      role: true,
    },
  });

  return { message: "get all users", data: result };
};

export const getUserById = async (id: string) => {
  const result = await db.query.user.findFirst({
    where: eq(user.id, id),
    with: {
      role: true,
    },
  });

  return { message: "get user by id", data: result };
};
