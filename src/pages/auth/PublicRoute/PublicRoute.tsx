import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";

const PublicRoute = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
