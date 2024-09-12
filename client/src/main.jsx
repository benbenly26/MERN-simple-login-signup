import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div>
      <Toaster position="top-center" richColors duration={3000} />
    </div>
    <App />
  </StrictMode>
);
