import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { mainRouter } from "./router/mainRouter";
import { DarkModeProvider } from "./components/Context/DarkModeContext";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ToastContainer position="bottom-right" autoClose={5000} />
    <DarkModeProvider>
      <RouterProvider router={mainRouter} />
      </DarkModeProvider>
    </PersistGate>

  </Provider>
);

