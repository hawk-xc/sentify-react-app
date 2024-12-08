// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = Cookies.get("token"); // Periksa token dari cookies

  if (!user && !token) {
    // Jika user dan token tidak ada, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  return children; // Jika user atau token ada, tampilkan konten
}
