import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "rsuite";
import Layout from "./layouts/Layout/Layout";
import LoginPage from "./pages/auth/Login/LoginPage";
import PrivateRoute from "./pages/auth/PrivateRoute/PrivateRoute";
import PublicRoute from "./pages/auth/PublicRoute/PublicRoute";
import SignUpPage from "./pages/auth/SignUp/SignUpPage";
import { authRoutes } from "./routes/auth";
import { commonRoutes } from "./routes/common";

function App() {
  const mixedRoutes = [...commonRoutes, ...authRoutes];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/signup" element={<PublicRoute />}>
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            {mixedRoutes.map((route) => {
              return (
                <Route
                  path={route.path}
                  key={route.key}
                  element={route.component}
                />
              );
            })}
            <Route path="*" element={<></>} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
