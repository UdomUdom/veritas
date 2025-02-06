import db from "@/db";

export const getRoles = async () => {
  return await db.query.role.findMany();
};
