// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cek token dari cookies saat aplikasi dimulai
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Anda dapat memvalidasi token atau mengambil data pengguna jika diperlukan
      // Untuk sementara kita anggap token valid dan set user ke state
      setUser({ token }); // Atur user jika token ada
    }
  }, []);

  const login = (token, userData) => {
    Cookies.set("token", token);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
