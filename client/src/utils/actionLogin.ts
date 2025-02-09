"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function actionLogin(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const cookieStore = await cookies();
  const res = await fetch(process.env.API_URL + "/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(rawData),
  });
  const setCookieHeader = res.headers.get("set-cookie");
  const session = setCookieHeader
    ? setCookieHeader.split(";")[0].split("=")[1]
    : null;
  if (session) {
    cookieStore.set("session", session);
  }

  redirect("/admin");
  return rawData;
}
