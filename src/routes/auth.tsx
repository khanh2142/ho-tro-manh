import ChangePassword from "../pages/auth/ChangePassword/ChangePassword";
import LoginPage from "../pages/auth/Login/LoginPage";
import Profile from "../pages/auth/Profile/Profile";

export const authRoutes = [
  {
    path: "/profile",
    component: <Profile />,
    text: "Profile",
    key: "profile",
  },
  {
    path: "/changePassword",
    component: <ChangePassword />,
    text: "ChangePassword",
    key: "changePassword",
  },
  {
    path: "/login",
    component: <LoginPage />,
    text: "Login",
    key: "login",
  },
];
