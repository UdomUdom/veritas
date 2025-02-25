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

  return result;
};

export const createBlog = async (body: BlogType) => {
  const [result] = await db.insert(blog).values(body).returning();

  if (!result) throw new Error("Failed to create blog");

  return result;
};

export const updateBlog = async (id: string, body: BlogUpdateType) => {
  const [result] = await db
    .update(blog)
    .set(body)
    .where(eq(blog.id, id))
    .returning();

  if (!result) throw new Error("Failed to update blog");

  return result;
};

export const deleteBlog = async (id: string) => {
  const [result] = await db.delete(blog).where(eq(blog.id, id)).returning();

  if (!result) throw new Error("Failed to delete blog");

  return result;
};
