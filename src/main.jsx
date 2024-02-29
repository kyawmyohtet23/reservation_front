import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

const rootElement = document.getElementById("root");

const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <ThemeContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
};

// Simulate a delay of 2000 milliseconds (2 seconds) before rendering the app
setTimeout(renderApp, 100);
