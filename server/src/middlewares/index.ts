import { ErrorHandler } from "@/utils/ErrorHandler";
import Supabase from "@/utils/Supabase";
import { Context } from "elysia";

export const isAuthorized = async (c: Context) => {
  try {
    const access_token = c.headers["access_token"];
    const refresh_token = c.headers["refresh_token"];

    const { data, error } = await Supabase.auth.getUser(access_token);

    if (error) throw new Error("Unauthorized");

    c.headers = {
      authorization: data.user.id,
      access_token,
      refresh_token,
    };
  } catch (err) {
    throw c.error(400, ErrorHandler(err));
  }
};

export const isAdmin = async (c: Context) => {};
