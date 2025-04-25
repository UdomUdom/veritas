"use client";
import { createClient } from "@/utils/Auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user?: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    avatar: string;
    birthdate?: string;
    phone?: string;
    gender?: string;
  };
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const sup = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthContextType["user"]>();

  const fetchUserData = useCallback(
    async (id?: string) => {
      if (!sup) return;

      const { data, error } = await sup
        .from("user")
        .select("*, role (name)")
        .eq("id", id)
        .single();

      if (!error && data) {
        setUser({
          id: data.id,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          role: data.role.name,
          avatar: data.avatar,
          birthdate: data.birthdate,
          phone: data.phone,
          gender: data.gender,
        });
      }

      setLoading(false);
    },
    [sup]
  );

  const signOut = async () => {
    if (!sup) return;

    await sup.auth.signOut();
    window.location.reload();
  };

  useEffect(() => {
    if (!sup) return;

    sup.auth.getSession().then(({ data: { session } }) => {
      fetchUserData(session?.user.id);
    });

    const {
      data: { subscription },
    } = sup.auth.onAuthStateChange(async (_, session) => {
      fetchUserData(session?.user.id);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserData, loading, sup]);

  return (
    <AuthContext.Provider
      value={
        {
          loading,
          setLoading,
          user,
          signOut,
        } as AuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
