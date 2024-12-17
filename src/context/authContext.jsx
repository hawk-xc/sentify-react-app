import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axiosClient
        .get("/profile")
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setUser(false); // Jika token tidak ada, set user ke false untuk selesai inisialisasi
    }
  }, []);

  const login = async (token) => {
    Cookies.set("token", token, { sameSite: "None", secure: true });
    setIsLogin(true);

    try {
      const userResponse = await axiosClient.get("/profile");
      setUser(userResponse.data.data[0]);
      console.log(userResponse.data.data[0]);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      Cookies.remove("token");
      setUser(null);
    }
  };

  const logout = () => {
    Cookies.remove("token", { sameSite: "None", secure: true });
    setIsLogin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
