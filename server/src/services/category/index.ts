import db from "@/db";
import { category } from "@/db/schema";
import { CategoryType } from "@/models/category";
import { eq, ilike } from "drizzle-orm";

interface CategoryQuery {
  q?: string;
}

export const getCategory = async ({ q }: CategoryQuery) => {
  const result = await db.query.category.findMany({
    where: q ? ilike(category.name, `%${q}%`) : undefined,
  });

  return result;
};

export const getCategoryById = async (id: string) => {
  const result = await db.query.category.findFirst({
    where: eq(category.id, id),
  });

  if (!result) throw new Error("Category not found");

  return result;
};

export const createCategory = async (data: CategoryType) => {
  const result = await db.transaction(async (tx) => {
    const [created] = await tx.insert(category).values(data).returning();

    if (!created) throw new Error("Failed to create category");

    return created;
  });

  return result;
};

export const updateCategory = async (id: string, data: CategoryType) => {
  const result = await db.transaction(async (tx) => {
    const [updated] = await tx
      .update(category)
      .set(data)
      .where(eq(category.id, id))
      .returning();

    if (!updated) throw new Error("Failed to update category");

    return updated;
  });

  return result;
};

export const deleteCategory = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const [deleted] = await tx
      .delete(category)
      .where(eq(category.id, id))
      .returning();

    if (!deleted) throw new Error("Failed to delete category");

    return deleted;
  });

  return result;
};
