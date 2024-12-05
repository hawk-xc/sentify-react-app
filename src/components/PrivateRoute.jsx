// src/components/PrivateRoute.jsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = Cookies.get("token"); // Cek token di cookies

  if (!user && !token) {
    // Jika tidak ada user dan tidak ada token, arahkan ke login
    return <Navigate to="/login" />;
  }

  return children; // Jika user atau token ada, tampilkan konten anak
}
