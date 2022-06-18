import { NavLink, Outlet } from "react-router-dom";

export const KanbanTemplate = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row flex-nowrap h-100">
        <div className="col-auto col-md-2 col-lg-1 px-sm-2 px-0 bg-light shadow-sm">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2">
            <ul
              className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <NavLink
                  to="/kanban"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-link align-middle px-0"
                      : "nav-link align-middle px-0"
                  }
                >
                  <i className="bi bi-view-stacked"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Proyectos</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/kanban/issues"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-link align-middle px-0"
                      : "nav-link align-middle px-0"
                  }
                >
                  <i className="bi bi-card-text"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Tareas</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
