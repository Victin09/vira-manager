import { Link, NavLink, Outlet } from "react-router-dom";

export const LandingTemplate = () => {
  return (
    <div className="d-flex flex-column w-100 h-100">
      <nav className="navbar bg-light navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/welcome" className="navbar-brand">
            Vira Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarLanding"
            aria-controls="offcanvasNavbarLanding"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbarLanding"
            aria-labelledby="offcanvasNavbarLandingLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLandingLabel">
                Vira Manager
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                    aria-current="page"
                  >
                    Inicia sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/sign-up"
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    Registrate
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};
