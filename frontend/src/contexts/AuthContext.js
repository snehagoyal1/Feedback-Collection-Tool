import { createContext, useContext } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("admin-token");
  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);