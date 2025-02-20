import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";

const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
