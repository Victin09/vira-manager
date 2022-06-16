import ReactDOM from "react-dom/client";
import "vira-design-system/dist/css/vira-design-system.css";
import "vira-design-system/dist/js/vira-design-system.js";
import "./index.css";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Router>
    <App />
  </Router>
);
