import db from "@/db";
import { blog } from "@/db/schema";
import { BlogType } from "@/models/blog";
import { QueryType } from "@/models/query";
import { eq } from "drizzle-orm";

export const createBlog = async (body: BlogType) => {
  return { message: "Create blog", data: null };
};

export const getAllBlogs = async ({ limit, offset }: QueryType = {}) => {
  const result = await db.query.blog.findMany({
    limit,
    offset,
  });

  return { message: "Get all blogs", data: result };
};

export const getBlogById = async (id: string) => {
  const result = await db.query.blog.findFirst({
    where: eq(blog.id, id),
  });

  return { message: "Get blog by id", data: result };
};

export const updateBlog = async (id: string, body: BlogType) => {
  const [result] = await db
    .update(blog)
    .set(body)
    .where(eq(blog.id, id))
    .returning();

  if (!result) throw new Error("Failed to update blog");

  return { message: `Update blog ${result.title} success`, data: null };
};

export const deleteBlog = async (id: string) => {
  const [result] = await db.delete(blog).where(eq(blog.id, id)).returning();

  if (!result) throw new Error("Failed to delete blog");

  return { message: `Delete blog ${result.title} success`, data: null };
};
