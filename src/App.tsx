import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "rsuite";
import Layout from "./layouts/Layout/Layout";
import { commonRoutes } from "./routes/common";

function App() {
  const mixedRoutes = [...commonRoutes];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
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
      </Routes>
    </Suspense>
  );
}

export default App;
