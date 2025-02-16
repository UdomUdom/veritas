import { ErrorHandler } from "@/utils/ErrorHandler";
import Supabase from "@/utils/Supabase";
import { Context } from "elysia";

export const isAuthorized = async (c: Context) => {
  try {
    const { access_token } = c.cookie;

    const { data, error } = await Supabase.auth.getUser(access_token.value);

    if (error) throw new Error("Unauthorized");

    c.headers = {
      authorization: data.user.id,
    };
  } catch (err) {
    throw c.error(400, ErrorHandler(err));
  }
};
