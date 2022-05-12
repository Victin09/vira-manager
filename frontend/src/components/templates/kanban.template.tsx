import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "@vira/components/templates/styles/kanban.template.css";
import { CreateKanbanProjectModal } from "@vira/components/kanban/create-project.kanban";
import { useAuth } from "@vira/common/providers/auth.provider";
import { useFetch } from "@vira/common/hooks/use-fetch.hook";

export const KanbanLayout = () => {
  const { fetchData, data, error } = useFetch<any>();
  const { getUser } = useAuth();

  useEffect(() => {
    fetchData(`/kanban/projects/${getUser().id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
  }, []);

  return (
    <div className="h-100 row flex-grow-1">
      <div className="sidebar col-md-2 shadow-sm overflow-auto">
        <div className="flex-shrink-0 pt-2 bg-white">
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-vds-toggle="collapse"
                  data-vds-target="#projects-collapse"
                  aria-expanded="true"
                >
                  Proyectos
                </button>
                <button
                  className="btn"
                  data-vds-toggle="modal"
                  data-vds-target="#createProjectModal"
                >
                  +
                </button>
              </div>
              <div className="collapse show" id="projects-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    {data && data.data.lenght > 0 ? (
                      data.data.map((project, index) => (
                        <a href="#" key={index} className="link-dark rounded">
                          Cargar proyectos
                        </a>
                      ))
                    ) : (
                      <Link to="/kanban/aaaa12" className="fw-light link-dark">
                        No tienes ningún proyecto asociado
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </li>
            <li className="mb-1">
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-vds-toggle="collapse"
                  data-vds-target="#tasks-collapse"
                  aria-expanded="true"
                >
                  Tareas
                </button>
              </div>
              <div className="collapse show" id="tasks-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <Link to={`/kanban/${getUser().id}/tasks`} className="link-dark rounded">
                      Ver tareas
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="border-top my-3"></li>
          </ul>
        </div>
      </div>
      <div className="col-md-10">{<Outlet />}</div>

      {/* MODALS */}
      <CreateKanbanProjectModal />
    </div>
  );
};
