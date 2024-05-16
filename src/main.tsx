import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextTheme } from "./context/ThemeContext.tsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextTheme>
      <App />
    </ContextTheme>
  </React.StrictMode>
);
