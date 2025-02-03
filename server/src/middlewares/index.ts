import db from "@/db";
import { user } from "@/db/schema";
import { verifyToken } from "@/utils/Auth";
import { eq } from "drizzle-orm";
import { Context } from "elysia";

export interface verifyType {
  id: string;
  username: string;
  role: string;
}

export const isAuthenticated = async (ctx: Context) => {
  const tokenValue = ctx.cookie.session.value;
  if (!tokenValue) throw new Error("Unauthorized");

  const verify = verifyToken(tokenValue) as verifyType;
  if (!verify) throw new Error("Unauthorized");

  const result = db.transaction(async (tx) => {
    const found = await tx.query.user.findFirst({
      where: eq(user.id, verify.id),
      with: {
        profile: {
          columns: {
            created_at: false,
            updated_at: false,
          },
        },
        role: true,
      },
      columns: {
        password: false,
        created_at: false,
        updated_at: false,
      },
    });
    return found;
  });
  ctx.body = result;
};

export const isAdmin = async (ctx: Context) => {
  const tokenValue = ctx.cookie.session.value;
  if (!tokenValue) throw new Error("Unauthorized");

  const result = verifyToken(tokenValue) as verifyType;
  if (!result) throw new Error("Unauthorized");

  if (result.role !== "admin") throw new Error("Unauthorized");
};

export const isStaff = async (ctx: Context) => {
  const tokenValue = ctx.cookie.session.value;
  if (!tokenValue) throw new Error("Unauthorized");

  const result = verifyToken(tokenValue) as verifyType;
  if (!result) throw new Error("Unauthorized");

  if (result.role !== "admin" && result.role !== "staff") {
    throw new Error("Unauthorized");
  }
};
