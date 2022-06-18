import React, { useState } from "react";
import { useForm } from "../../hooks/use-form";
import { useAuth } from "../../providers/auth";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { CreateProjectType, ProjectType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";

export const CreateKanbanProjectModal = (): React.ReactElement => {
  const { getUser } = useAuth();
  const { setProjects, projects } = useKanban();
  const { register, values, errors, handleSubmit } =
    useForm<CreateProjectType>();
  const [projectCreated, setProjectCreated] = useState<boolean>(false);

  const sendForm = async () => {
    const response = await fetch(`${getApiUrl()}/kanban/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...values, users: [getUser()!.id] }),
    });
    const result: ApiResponse<ProjectType> = await response.json();
    if (result.status === 201) {
      console.log("created", result.data);
      setProjects([...projects, result.data]);
      setProjectCreated(true);
    }
  };

  return (
    <div
      className="modal fade"
      id="createProjectModal"
      tabIndex={-1}
      aria-labelledby="createProjectModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex justify-content-between mb-3">
              <h5 className="modal-title" id="createProjectModalLabel">
                Nuevo proyecto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {projectCreated && (
              <div className="alert alert-success" role="alert">
                Proyecto creado <span className="fw-semibold">éxito</span>!
              </div>
            )}
            <form onSubmit={handleSubmit(sendForm)} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre del proyecto
                </label>
                <input
                  type="text"
                  className={`${errors.name ? "is-invalid " : ""}form-control`}
                  id="name"
                  placeholder="Proyecto 1"
                  name="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "El nombre es obligatorio",
                    },
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    <span className="fw-semibold">Opps!</span> {errors.name}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descripción del proyecto
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Descripción del proyecto 1"
                  rows={3}
                  name="description"
                  {...register("description")}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
