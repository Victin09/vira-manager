import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateKanbanProjectModal } from "../../components/kanban/create-project";
import { useAuth } from "../../providers/auth";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { ProjectType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { formatToDate } from "../../utils/date";

const KanbanView = () => {
  const [filterProject, setFilterProject] = useState("");
  const { getUser } = useAuth();
  const {
    projects,
    setProjects,
    displayCreateProjectModal,
    setDisplayCreateProjectModal,
  } = useKanban();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: Response = await fetch(
        `${getApiUrl()}/kanban/projects/${getUser()!.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result: ApiResponse<ProjectType[]> = await response.json();
      if (result.status === 200) {
        console.log("data", result);
        setProjects(result.data);
        setLoading(false);
      }
    };
    fetchData();
  }, [getUser, setProjects]);

  return (
    <div data-uk-height-viewport="offset-top: true">
      {loading ? (
        <span>Loading</span>
      ) : (
        <div
          className="uk-grid-small uk-grid-row-large uk-padding-small"
          data-uk-grid
          data-uk-height-match
        >
          <div className="uk-flex uk-flex-between uk-width-1-1">
            <span className="uk-text-large uk-text-bold">Tus proyectos</span>
            <button
              className="uk-button uk-button-primary uk-border-rounded"
              type="button"
              onClick={() => setDisplayCreateProjectModal(true)}
            >
              Crear proyecto
            </button>
            {displayCreateProjectModal && <CreateKanbanProjectModal />}
          </div>
          {!projects.length ? (
            <div
              className="uk-flex uk-flex-column uk-width-1-1"
              style={{ alignItems: "center" }}
            >
              <span className="uk-text-bold">
                No tienes ningún proyecto de software
              </span>
              <p>
                Crea un nuevo proyecto de software para planificar, supervisar y
                publicar software de gran calidad con tu equipo.
              </p>
              <button
                className="uk-width-1-6 uk-button uk-button-primary uk-border-rounded"
                type="button"
                onClick={() => setDisplayCreateProjectModal(true)}
              >
                Crear proyecto
              </button>
            </div>
          ) : (
            <div className="d-flex flex-col mt-5">
              <div className="input-group input-group-sm flex-nowrap mb-3 w-25">
                <span className="input-group-text" id="addon-wrapping">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Busca un proyecto"
                  aria-label="Busca un proyecto"
                  aria-describedby="addon-wrapping"
                  onChange={(e) => setFilterProject(e.target.value)}
                />
              </div>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha de creación</th>
                  </tr>
                </thead>
                <tbody>
                  {projects
                    .filter((item) => {
                      if (!filterProject) return true;
                      if (
                        item.name.toLowerCase().includes(filterProject) ||
                        item.name.toLowerCase().includes(filterProject)
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((project, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <Link to={`/kanban/${project._id}`}>
                            {project.code}
                          </Link>
                        </th>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{formatToDate(project.createdAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KanbanView;
