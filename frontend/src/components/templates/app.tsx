import { useAuth } from "../../providers/auth";
import { Link, Outlet } from "react-router-dom";
import { getInitials } from "../../utils/text";

export const AppTemplate = () => {
  const { getUser } = useAuth();

  return (
    <div className="d-flex flex-column w-100 h-100">
      <nav className="navbar bg-light navbar-expand-lg shadow-sm">
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
                <li className="nav-item dropdown">
                  <span
                    className="d-flex align-items-center justify-content-center nav-link"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {getUser()!.fullname.toUpperCase()}
                  </span>
                  <ul
                    className="dropdown-menu dropdown-menu-end border-0 shadow"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="profile" className="dropdown-item">
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                      >
                        Cerrar sesión
                      </span>
                    </li>
                  </ul>
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
