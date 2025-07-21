// src/context/AuthContext.tsx
import React, { createContext, useEffect } from "react";


interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
// In AuthContext or App.tsx
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    // auto-login as demo user
    axios.post("/api/login", { email: "demo@user.com", password: "demopassword" })
      .then(res => {
        localStorage.setItem("token", (res.data as { token: string }).token);
        window.location.reload();
      });
  }
}, []);

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
