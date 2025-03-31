"use client";
import { createContext, useContext } from "react";

interface ContextType {
  id: string;
  email: string;
  role: string;
  avatar?: string;
}

export const Context = createContext<ContextType>({
  id: "",
  email: "",
  role: "",
  avatar: "",
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Context.Provider
      value={
        {
          id: "",
          email: "",
          role: "",
        } as ContextType
      }
    >
      {children}
    </Context.Provider>
  );
}

export const useContextProvider = () => useContext(Context);
