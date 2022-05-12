import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "vira-design-system/dist/css/vira-design-system.css";
import "vira-design-system/dist/js/vira-design-system.bundle";
import App from "@vira/app";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
