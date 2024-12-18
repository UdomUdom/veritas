"use server";
import { redirect } from "next/navigation";

export default async function actionLogin(prevState: any, data: FormData) {
  const rawData = Object.fromEntries(data);
  console.log(rawData);

  redirect("/dashboard");

  return { message: "account error 💀" };
}
