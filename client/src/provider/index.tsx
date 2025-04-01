"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { client } from "@/utils/Supabase";

interface ContextType {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  avatar: string;
}

const Context = createContext<ContextType | null>(null);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ContextType>();

  const getUser = async () => {
    const { data: session } = await client.auth.getSession();

    if (session?.session?.user) {
      const { data, error } = await client
        .from("user")
        .select()
        .eq("auth_id", session.session.user.id);

      if (error) {
        console.error("Error fetching user data:", error);
      }

      if (data && data.length > 0) {
        setUser(data[0] as ContextType);
      } else {
        setUser(undefined);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Context.Provider
      value={
        {
          id: user?.id,
          email: user?.email,
          firstname: user?.firstname,
          lastname: user?.lastname,
          role: user?.role,
          avatar: user?.avatar,
        } as ContextType
      }
    >
      {children}
    </Context.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(Context);

  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
};
