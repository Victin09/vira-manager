import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import App from "./app";

const root = document.getElementById("root");
render(
  <Router>
    <App />
  </Router>,
  root
);
