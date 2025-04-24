import Supabase from "@/utils/Supabase";

interface UserRequest {
  email: string;
  password: string;
}

export const errorSignup = async (id: string) => {
  const { error } = await Supabase.auth.admin.deleteUser(id);

  if (error) throw new Error(error.message);

  return;
};

export const handleSignup = async (body: UserRequest) => {
  const { data, error } = await Supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const handleResetPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  const { error: signin_error } = await Supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (signin_error) throw new Error(signin_error.message);

  const { data, error } = await Supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  return data;
};
