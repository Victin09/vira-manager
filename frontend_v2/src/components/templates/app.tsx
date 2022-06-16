import { useAuth } from "../../providers/auth";
import { NavLink, Link, Outlet } from "react-router-dom";

export const AppTemplate = () => {
  const { getUser } = useAuth();

  return (
    <div className="d-flex flex-col h-full">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm w-100">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            vira.Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-vds-toggle="collapse"
            data-vds-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/kanban"
                  className={(navData) =>
                    navData.isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Kanban
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-vds-toggle="dropdown"
                  aria-expanded="false"
                >
                  {getUser()?.fullname.toUpperCase()}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
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

      <div className="d-flex h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};
