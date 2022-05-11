import React, { useEffect } from "react";
import Select from "react-select";
import { useForm } from "@vira/common/hooks/use-form.hook";
import { CreateProject } from "@vira/models/kanban/board.model";
import { useFetch } from "@vira/common/hooks/use-fetch.hook";
import { ApiResponse } from "@vira/common/types/api-response.type";
import { User } from "@vira/models/user.model";
import { getApiUrl } from "@vira/common/utils/api.util";

export const CreateKanbanProjectModal = (): JSX.Element => {
  const { register, values, handleSubmit, errors } = useForm<CreateProject>();
  const { fetchData, data, error } = useFetch<ApiResponse<any>>();
  const [users, setUsers] = React.useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${getApiUrl()}/users/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await response.json();
      data.data.map((user) => setUsers([...users, { value: user._id, label: user.fullname }]));
    };

    getUsers();
  }, []);

  const sendForm = () => {
    fetchData(`/kanban/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(values)
    });
  };

  return (
    <>
      {console.log("users", users)}
      {users ? (
        <div
          className="modal fade"
          id="createProjectModal"
          tabIndex={-1}
          aria-labelledby="createProjectModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createProjectModalLabel">
                  Nuevo proyecto
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-vds-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(sendForm)} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre del proyecto
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Project name cant be empty"
                        }
                      })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Descripción del proyecto
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={3}
                      style={{ resize: "none" }}
                      {...register("description")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Imagen del proyecto
                    </label>
                    <input className="form-control" type="file" id="image" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="users" className="form-label">
                      Usuarios
                    </label>
                    <Select
                      isMulti
                      name="colors"
                      options={users}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Crear
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
