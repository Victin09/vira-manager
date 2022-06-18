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
  const { projects, setProjects, setDisplayCreateProjectModal } = useKanban();
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
    <div className="d-flex flex-column flex-grow-1">
      {loading ? (
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="d-flex justify-content-between w-100">
            <span className="fw-semibold fs-5">Tus proyectos</span>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setDisplayCreateProjectModal(true)}
              data-bs-toggle="modal"
              data-bs-target="#createProjectModal"
            >
              Crear proyecto
            </button>
            <CreateKanbanProjectModal />
          </div>
          {!projects.length ? (
            <div
              className="d-flex flex-column flex-grow-1"
              style={{ alignItems: "center" }}
            >
              <span className="fs-semibold">
                No tienes ningún proyecto de software
              </span>
              <p>
                Crea un nuevo proyecto de software para planificar, supervisar y
                publicar software de gran calidad con tu equipo.
              </p>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setDisplayCreateProjectModal(true)}
              >
                Crear proyecto
              </button>
            </div>
          ) : (
            <div className="w-100">
              <div className="mt-3">
                <div className="input-group mb-3 w-25">
                  <span className="input-group-text" id="search-project">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Proyecto vira"
                    aria-label="Username"
                    aria-describedby="search-project"
                    onChange={(e) => setFilterProject(e.target.value)}
                  />
                </div>
              </div>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha de creación</th>
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
