import { ErrorHandler } from "@/utils/ErrorHandler";
import { verifyToken } from "@/utils/Token";
import { Context } from "elysia";

export const isAuthorized = async (c: Context) => {
  try {
    if (!c.headers["authorization"]?.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }

    const session = c.headers["authorization"]?.split(" ")[1];

    if (!session) throw new Error("Unauthorized");

    const verify = (await verifyToken(session!)) as { id: string };

    if (!verify) throw new Error("Unauthorized");

    c.headers = {
      authorization: verify.id,
    };
  } catch (err) {
    throw c.error(400, ErrorHandler(err));
  }
};
