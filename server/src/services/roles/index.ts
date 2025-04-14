import db from "@/db";
import { eq } from "drizzle-orm";
import { role } from "@/db/schema";

export const createRole = async (name: string) => {
  const [result] = await db.insert(role).values({ name }).returning();

  if (!result) throw new Error("Failed to create role");

  return { message: `Role '${result.name}' created successfully`, data: null };
};

export const getAllRole = async () => {
  const result = await db.query.role.findMany();

  return { message: "Get all roles", data: result };
};

export const getRoleById = async (id: string) => {
  const result = await db.query.role.findFirst({
    where: eq(role.id, id),
  });

  return { message: `Get role by id`, data: result };
};

export const updateRole = async (id: string, name: string) => {
  const [result] = await db
    .update(role)
    .set({
      name,
    })
    .where(eq(role.id, id))
    .returning();

  if (!result) throw new Error("Failed to update role");

  return { message: `Update role ${result.name} success`, data: null };
};

export const deleteRole = async (id: string) => {
  const [result] = await db.delete(role).where(eq(role.id, id)).returning();

  if (!result) throw new Error("Failed to delete role");

  return { message: `Delete role ${result.name} success`, data: null };
};
