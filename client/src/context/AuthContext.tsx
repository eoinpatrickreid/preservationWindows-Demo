// src/context/AuthContext.tsx
import React, { createContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In demo mode, always authenticated
  const login = async (_email: string, _password: string) => Promise.resolve();
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ isAuthenticated: true, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
