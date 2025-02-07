"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchData } from "@/libs/fetch";

export default async function actionLogin(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const rawData = Object.fromEntries(formData);
  const res = await fetchData("POST", "/api/users/login", rawData);

  const data = await res.json();
  const setCookieHeader = res.headers.get("set-cookie");
  if (data.status === "ok" && setCookieHeader) {
    const sessionCookie = setCookieHeader.split(";")[0].split("=")[1];
    // Store both session token and role in the cookie
    cookieStore.set(
      "session",
      JSON.stringify({ token: sessionCookie, role: data.role }),
      { path: "/" }
    );
    redirect("/admin");
  }
  return data;
}
