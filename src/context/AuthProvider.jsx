import { createContext, useState, useEffect, useContext, useMemo } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(() => Cookies.get("token") || null);

  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      Cookies.set("token", newToken, { sameSite: "None", secure: true });
    } else {
      Cookies.remove("token", { sameSite: "None", secure: true });
    }
  };

  const login = (newToken) => {
    setToken(newToken);
    Cookies.set("token", newToken);
  };

  const logout = () => {
    setToken(null);
    Cookies.remove("token");
  };

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { sameSite: "None", secure: true });
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, login, logout }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
