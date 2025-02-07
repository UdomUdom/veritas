import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie ? JSON.parse(cookie.value) : null;
};
