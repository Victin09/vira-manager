import { useAuth } from "@vira/common/providers/auth.provider";
import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

export const AppTemplate = () => {
  const { getUser } = useAuth();

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
            <ul className="navbar-nav mb-2">
              <li className="nav-item">
                <NavLink
                  to="/kanban"
                  className={(navData) => "nav-link" + (navData.isActive ? " active" : "")}
                >
                  Kanban
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/docs"
                  className={(navData) => "nav-link" + (navData.isActive ? " active" : "")}
                >
                  Documentation
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/chat"
                  className={(navData) => "nav-link" + (navData.isActive ? " active" : "")}
                >
                  Chat
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-vds-toggle="dropdown"
                  aria-expanded="false"
                >
                  {getUser().fullname.toUpperCase()}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Perfil
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
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
