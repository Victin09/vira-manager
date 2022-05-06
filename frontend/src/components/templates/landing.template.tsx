import React from "react";
import { Link, Outlet } from "react-router-dom";

export const LandingTemplate = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column px-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/welcome">
            vira.MANAGER
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-vds-toggle="collapse"
            data-vds-target="#landingNavbar"
            aria-controls="landingNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="landingNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/sign-in">
                  Iniciar sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-primary" to="/sign-up">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid d-flex flex-grow-1 flex-column">
        <div className="row flex-grow-1">
          <div className="col-md-12">{<Outlet />}</div>
        </div>
      </div>
    </div>
  );
};
