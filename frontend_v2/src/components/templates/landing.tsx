import { Link, NavLink, Outlet } from "react-router-dom";

export const LandingTemplate = () => {
  return (
    <div className="d-flex flex-column w-100 h-100 container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/welcome" className="navbar-brand">
            vira.Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-vds-toggle="collapse"
            data-vds-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <NavLink
                to="/sign-in"
                className={(navData) =>
                  navData.isActive ? "active nav-link" : "nav-link"
                }
              >
                Inicia sesión
              </NavLink>
              <NavLink
                to="/sign-up"
                className={(navData) =>
                  navData.isActive ? "active nav-link" : "nav-link"
                }
              >
                Registrate
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-100 h-100">
        <Outlet />
      </div>
    </div>
  );
};
