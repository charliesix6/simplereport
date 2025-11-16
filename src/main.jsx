import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Website from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Website />
    </HashRouter>
  </React.StrictMode>
);
