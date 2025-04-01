import Supabase from "@/utils/Supabase";

interface SigninType {
  email: string;
  password: string;
}

const sup = Supabase();

export const handleSignin = async ({ email, password }: SigninType) => {
  if (!sup) {
    throw new Error("Supabase client is not initialized");
  }

  try {
    const { error } = await sup.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return "Login successful!";
  } catch (error) {
    console.warn(error);
  }
};

export const handleSignout = async () => {
  if (!sup) {
    throw new Error("Supabase client is not initialized");
  }

  try {
    const { error } = await sup.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    window.location.reload();
  } catch (error) {
    console.warn(error);
  }
};
