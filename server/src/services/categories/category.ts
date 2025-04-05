import db from "@/db";
import { category } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createCategory = async (name: string) => {
  const [result] = await db.insert(category).values({ name }).returning();

  if (!result) throw new Error("Failed to create category");

  return {
    message: `Category '${result.name}' created successfully`,
    data: null,
  };
};

export const getAllCategories = async () => {
  const result = await db.query.category.findMany();

  return { message: "Get all categories", data: result };
};

export const getCategoryById = async (id: string) => {
  const result = await db.query.category.findFirst({
    where: eq(category.id, id),
  });

  return { message: `Get category by id`, data: result };
};

export const updateCategory = async (id: string, name: string) => {
  const [result] = await db
    .update(category)
    .set({
      name,
    })
    .where(eq(category.id, id))
    .returning();

  if (!result) throw new Error("Failed to update category");

  return { message: `Update category ${result.name} success`, data: null };
};

export const deleteCategory = async (id: string) => {
  const [result] = await db
    .delete(category)
    .where(eq(category.id, id))
    .returning();

  if (!result) throw new Error("Failed to delete category");

  return { message: `Delete category ${result.name} success`, data: null };
};
