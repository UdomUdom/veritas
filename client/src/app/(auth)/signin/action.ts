"use server";
import { createServer } from "@/utils/Auth";

interface SigninData {
  email: string;
  password: string;
}

export async function signin(formData: SigninData) {
  const sup = await createServer();

  if (!sup) {
    throw "Supabase client not initialized";
  }

  const { error } = await sup.auth.signInWithPassword({
    email: formData.email as string,
    password: formData.password as string,
  });

  if (error) throw "Login failed";

  return "Login successful";
}
