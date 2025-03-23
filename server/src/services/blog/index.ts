import db from "@/db";
import { blog } from "@/db/schema";
import { BlogType, BlogUpdateType } from "@/models/blog";
import { eq, ilike } from "drizzle-orm";

interface BlogsQuery {
  q?: string;
}

const ignoreColumns = {
  category_id: false,
};

export const getBlogs = async ({ q }: BlogsQuery) => {
  const result = await db.query.blog.findMany({
    columns: ignoreColumns,
    where: q ? ilike(blog.title, `%${q}%`) : undefined,
    with: {
      category: true,
    },
  });

  return result;
};

export const getBlogById = async (id: string) => {
  const result = await db.query.blog.findFirst({
    columns: ignoreColumns,
    where: eq(blog.id, id),
    with: {
      category: true,
    },
  });

  if (!result) throw new Error("Blog not found");

  return result;
};

export const createBlog = async (body: BlogType) => {
  const result = await db.transaction(async (tx) => {
    const [created] = await tx.insert(blog).values(body).returning();

    if (!created) throw new Error("Failed to create blog");

    return created;
  });

  return result;
};

export const updateBlog = async (id: string, body: BlogUpdateType) => {
  const result = await db.transaction(async (tx) => {
    const [updated] = await tx
      .update(blog)
      .set(body)
      .where(eq(blog.id, id))
      .returning();

    if (!updated) throw new Error("Failed to update blog");

    return updated;
  });

  return result;
};

export const deleteBlog = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const [deleted] = await tx.delete(blog).where(eq(blog.id, id)).returning();

    if (!deleted) throw new Error("Failed to delete blog");

    return deleted;
  });

  return result;
};
