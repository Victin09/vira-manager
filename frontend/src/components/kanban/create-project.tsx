import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../providers/auth";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { CreateProjectType, ProjectType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { formatToDateInput } from "../../utils/date";

export const CreateKanbanProjectModal = (): React.ReactElement => {
  const { getUser } = useAuth();
  const { setProjects, projects } = useKanban();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectType>();

  const [projectCreated, setProjectCreated] = useState<boolean>(false);
  const [displayLimitDate, setDisplayLimitDate] = useState<boolean>(false);

  const handleClose = () => {
    reset();
    setProjectCreated(false);
  };

  const onSubmit: SubmitHandler<CreateProjectType> = async (data) => {
    console.log("data", data);
    const response = await fetch(`${getApiUrl()}/kanban/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...data,
        users: [getUser()!.id],
      }),
    });
    const result: ApiResponse<ProjectType> = await response.json();
    if (result.status === 201) {
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
      data-bs-backdrop="static"
      data-bs-keyboard="false"
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
                onClick={handleClose}
              ></button>
            </div>
            {projectCreated && (
              <div className="alert alert-success" role="alert">
                Proyecto creado <span className="fw-semibold">éxito</span>!
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre del proyecto
                </label>
                <input
                  type="text"
                  className={`${errors.name ? "is-invalid " : ""}form-control`}
                  id="name"
                  placeholder="Proyecto 1"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    <span className="fw-semibold">Opps!</span> El nombre es
                    obligatorio
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
                  {...register("description")}
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => setDisplayLimitDate(!displayLimitDate)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Con fecha límite
                  </label>
                </div>
              </div>

              {displayLimitDate && (
                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <label htmlFor="initDate" className="form-label">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      id="initDate"
                      className="form-control"
                      {...register("initDate", {
                        value: displayLimitDate
                          ? formatToDateInput(new Date().toDateString())
                          : "",
                      })}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      Fecha de fin
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      className="form-control"
                      {...register("endDate", {
                        value: displayLimitDate
                          ? formatToDateInput(new Date().toDateString())
                          : "",
                      })}
                    />
                  </div>
                </div>
              )}
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
