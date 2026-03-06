"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { tokenManager } from "@/lib/token";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  userEmail: string | null;
  setToken: (token: string | null) => void;
  setUserEmail: (email: string | null) => void;
}

interface AccessTokenPayload {
  email: string;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>("asdasda");
  const [userEmail, setUserEmail] = useState<string | null>("asdasda");
  const router = useRouter();
  const menu = [
    {
      routeName: "",
    },
  ];
  // useEffect(() => {
  //   if (userEmail != null) {
  //     router.replace("/dashboard");
  //   }
  // }, []);
  return (
    <AuthContext.Provider
      value={{
        token,
        userEmail,
        setUserEmail,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
