import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth";

/* Protected route guard for private routes. Check token in cookie and verify it. */
export const PrivateRoute = () => {
  const { getUser } = useAuth();
  return getUser() ? <Outlet /> : <Navigate to="/welcome" />;
};
