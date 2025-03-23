import { handleGetUser } from "@/utils/Auth";
import { ErrorHandler } from "@/utils/Handler";
import { Context } from "elysia";

export const isAuthorized = async (c: Context) => {
  try {
    const access_token = c.headers["access_token"];
    const refresh_token = c.headers["refresh_token"];

    const data = await handleGetUser(access_token);

    c.headers = {
      authorization: data.user.id,
      access_token,
      refresh_token,
    };
  } catch (err) {
    throw c.error(400, ErrorHandler(err));
  }
};

// export const isAdmin = async (c: Context) => {};
