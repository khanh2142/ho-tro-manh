import { createRoot } from "react-dom/client";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <CustomProvider>
    <App />
  </CustomProvider>
);
