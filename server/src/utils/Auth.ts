import Supabase from "./Supabase";

interface UserType {
  email: string;
  password: string;
}

export const handleSignup = async (body: UserType) => {
  const { data, error } = await Supabase.auth.signUp(body);

  if (error) throw new Error(error.message);

  return data;
};

export const handleSignin = async (body: UserType) => {
  const { data, error } = await Supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const handleRefreshToken = async (refresh_token: string) => {
  const { data, error } = await Supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const handleSignout = async () => {
  const { error } = await Supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const handleResetPassword = async (password: string) => {
  const { data, error } = await Supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const handleGetUser = async (access_token?: string) => {
  const { data, error } = await Supabase.auth.getUser(access_token);

  if (error) throw new Error("Unauthorized");

  return data;
};
