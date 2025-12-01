import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  // Auto logout when token expires
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const { exp } = jwtDecode(token);
    const ms = exp * 1000 - Date.now();

    if (ms <= 0) return logout();

    const timer = setTimeout(logout, ms);

    return () => clearTimeout(timer);
  }, [isLogin]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
