import { Link, NavLink, Outlet } from "react-router-dom";
import { useKanban } from "../../providers/kanban";

export const KanbanTemplate = () => {
  const { selectedProject } = useKanban();

  return (
    <div className="d-flex h-100">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light shadow-sm border-end"
        style={{ width: "10em" }}
      >
        <div className="d-flex align-items-center mb-3">
          <div className="d-flex align-items-center rounded rounded-2 bg-primary text-white me-2 px-2">
            {selectedProject?.code}
          </div>
          <span className="text-center fw-semibold">
            {selectedProject?.name}
          </span>
        </div>
        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <Link
              to={`/kanban/${selectedProject?._id}/board`}
              className="nav-link active"
              aria-current="page"
            >
              <i className="bi bi-kanban"></i>
              <span className="ms-2">Tablero</span>
            </Link>
          </li>
          {selectedProject?.type === "SCRUM" && (
            <li>
              <Link
                to={`/kanban/${selectedProject?._id}/backlog`}
                className="nav-link link-dark"
              >
                <i className="bi bi-list-columns-reverse"></i>
                <span className="ms-2">Backlog</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="col py-3 h-100">
        <Outlet />
      </div>
      {/* </div> */}
    </div>
  );
};
