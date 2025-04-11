import db from "@/db";
import { category, event } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getEventByCategory = async (name: string) => {
  const cat = await db.query.category.findFirst({
    where: eq(category.name, name),
  });

  if (!cat) throw new Error("Category not found");

  const result = await db.query.event.findMany({
    where: eq(event.category_id, cat.id),
  });

  return { message: "Get event by category", data: result };
};
