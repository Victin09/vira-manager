import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth";

export const PublicRoute = () => {
  const { getUser } = useAuth();
  return !getUser() ? <Outlet /> : <Navigate to="/" />;
};
