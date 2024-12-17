import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute = () => {
  const { isLogin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
