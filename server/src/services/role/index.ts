import db from "@/db";
import { role } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";

interface RoleQuery {
  q?: string;
}

export const getRole = async ({ q }: RoleQuery) => {
  const result = await db.query.role.findMany({
    where: q ? ilike(role.name, `%${q}%`) : undefined,
  });

  return result;
};

export const getRoleById = async (id: string) => {
  const result = await db.query.role.findFirst({
    where: eq(role.id, id),
  });

  if (!result) throw new Error("Role not found");

  return result;
};
