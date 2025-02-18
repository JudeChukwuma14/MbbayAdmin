import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./router/mainRouter";
import { DarkModeProvider } from "./components/Context/DarkModeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer position="bottom-right" autoClose={5000} />
    <DarkModeProvider>
    <RouterProvider router={mainRouter} />
    </DarkModeProvider>
  </StrictMode>
);
