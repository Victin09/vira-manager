// import "vira-design-system/dist/css/vira-design-system.css";
// import "vira-design-system/dist/js/vira-design-system.js";
import "uikit/dist/css/uikit.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import "./index.css";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";

// loads the Icon plugin
UIkit.use(Icons);

const root = document.getElementById("root");
render(
  <Router>
    <App />
  </Router>,
  root
);
