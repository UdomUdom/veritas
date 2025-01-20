import { verifyToken } from "@/utils/Auth";
import { Context } from "elysia";
import { getUserProfile } from "@/utils/UserProfile";

export interface verifyType {
  id: string;
  username: string;
  role: string;
}

export const isAuthenticated = async (ctx: Context) => {
  const tokenValue = ctx.cookie.token?.value;
  if (!tokenValue) throw new Error("Unauthorized");

  const verify = verifyToken(tokenValue) as verifyType;
  if (!verify) throw new Error("Unauthorized");

  const result = await getUserProfile(verify);
  ctx.body = result;
};

export const isAdmin = async (ctx: Context) => {
  const tokenValue = ctx.cookie.token?.value;
  if (!tokenValue) throw new Error("Unauthorized");

  const result = verifyToken(tokenValue) as verifyType;
  if (!result) throw new Error("Unauthorized");

  if (result.role == "admin") throw new Error("Unauthorized");
};

export const isInstructor = async (ctx: Context) => {
  const tokenValue = ctx.cookie.token?.value;
  if (!tokenValue) throw new Error("Unauthorized");

  const result = verifyToken(tokenValue) as verifyType;
  if (!result) throw new Error("Unauthorized");

  if (result.role == "Admin" || result.role === "Instructor")
    throw new Error("Unauthorized");
};
