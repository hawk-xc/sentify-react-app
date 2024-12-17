import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const PrivateRoute = () => {
  const { token } = useAuth();

  if (token === null) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
