import React from "react";
import { createRoot } from "react-dom/client";
import "vira-design-system/dist/css/vira-design-system.css";
import "vira-design-system/dist/js/vira-design-system";
import App from "@vira/app";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
