import { Link, Outlet, useLocation } from "react-router-dom";

export const KanbanTemplate = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="uk-grid-small uk-grid-divider"
      data-uk-grid
      data-uk-height-match
    >
      <div className="uk-width-1-6">
        <ul
          className="uk-nav uk-nav-default uk-padding-small"
          style={{ fontSize: "1.15em" }}
        >
          <li className={`${pathname === "/kanban" ? "uk-active " : ""}`}>
            <Link to="/kanban">
              <span
                className="uk-margin-small-right"
                data-uk-icon="icon: thumbnails"
              ></span>
              Proyectos
            </Link>
          </li>
          <li
            className={`${pathname === "/kanban/issues" ? "uk-active " : ""}`}
          >
            <Link to="/kanban/issues">
              <span
                className="uk-margin-small-right"
                data-uk-icon="icon: album"
              ></span>
              Tareas
            </Link>
          </li>
        </ul>
      </div>
      <div className="uk-width-5-6">
        <Outlet />
      </div>
    </div>
  );
};
