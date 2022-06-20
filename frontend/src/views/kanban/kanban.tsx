import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateKanbanProjectModal } from "../../components/kanban/create-project";
import { useAuth } from "../../providers/auth";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { ProjectType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { formatToDate } from "../../utils/date";

const KanbanView = () => {
  const navigate = useNavigate();
  const [filterProject, setFilterProject] = useState("");
  const { getUser } = useAuth();
  const { projects, setProjects, setSelectedProject } = useKanban();
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
  }, []);

  const handleClick = (project: ProjectType) => {
    setSelectedProject(project);
    navigate(`/kanban/${project._id}/board`);
  };

  return (
    <div className="d-flex flex-column flex-grow-1 p-2">
      {loading ? (
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="d-flex flex-wrap justify-content-between w-100">
            <span className="fw-semibold fs-5">Tus proyectos</span>
            <button
              className="btn btn-primary"
              type="button"
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
              <button className="btn btn-primary" type="button">
                Crear proyecto
              </button>
            </div>
          ) : (
            <div className="w-100">
              <div className="row mt-5">
                <div className="col-12 col-sm-3">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="search-project">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Proyecto vira"
                      aria-label="Username"
                      aria-describedby="search-project"
                      onChange={(e) => setFilterProject(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th className="text-truncate">Fecha de creación</th>
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
                          <th
                            className="text-primary"
                            scope="row"
                            onClick={() => handleClick(project)}
                            style={{ cursor: "pointer" }}
                          >
                            {project.code}
                          </th>
                          <td>{project.name}</td>
                          <td>{project.description}</td>
                          <td>{formatToDate(project.createdAt)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KanbanView;
