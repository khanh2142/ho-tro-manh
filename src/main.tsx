import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CustomProvider
      components={{
        Button: {
          defaultProps: {
            color: "green",
          },
        },
      }}
    >
      <App />
    </CustomProvider>
  </BrowserRouter>
);
