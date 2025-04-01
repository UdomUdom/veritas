import { createClient } from "@supabase/supabase-js";

export const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SigninType {
  email: string;
  password: string;
}

export const handleSignin = async ({ email, password }: SigninType) => {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const handleSignout = async () => {
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  window.location.reload();
};
