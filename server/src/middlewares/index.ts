import { verifyToken } from "@/utils/Token";
import { Context } from "elysia";

export interface verifyType {
  id: string;
  username: string;
  role: string;
}

export const isAuthenticated = async (c: Context) => {
  try {
    const session = c.headers.authorization;

    const verify = (await verifyToken(session!)) as verifyType;

    c.headers = {
      authorization: `bearer ${verify.id}`,
      permission: verify.role,
    };
  } catch (err) {
    c.headers = { authorization: "", permission: "" };
    throw c.error(401, { message: "Unauthorized" });
  }
};
