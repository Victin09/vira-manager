import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/use-form";
import { useAuth } from "../../providers/auth";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { CreateProjectType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";

export const CreateKanbanProjectModal = (): React.ReactElement => {
  const { getUser } = useAuth();
  const { setDisplayCreateProjectModal, setProjects, projects } = useKanban();
  const [projectCreated, setProjectCreated] = useState<boolean>(false);
  const { register, values, handleSubmit } = useForm<CreateProjectType>();
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${getApiUrl()}/users/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      data.data.map((user: any) =>
        setUsers([...users, { value: user._id, label: user.fullname }])
      );
    };

    getUsers();
  }, []);

  const sendForm = async () => {
    const projectUsers = [
      ...selectedUsers.map((user) => user.value),
      getUser()!._id,
    ];
    const response = await fetch(`${getApiUrl()}/kanban/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...values, users: projectUsers }),
    });
    const data: ApiResponse<any> = await response.json();
    if (data.status === 201) {
      setProjects([...projects, data.data]);
      setProjectCreated(true);
    }
  };

  return (
    <>
      {users && (
        <>
          <div
            id="createKanbanProject"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  // data-modal-toggle='createKanbanProject'
                  onClick={() => setDisplayCreateProjectModal(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Crear un nuevo proyecto
                  </h3>
                  {projectCreated && (
                    <div
                      className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded dark:bg-green-200 dark:text-green-800"
                      role="alert"
                    >
                      <span className="font-medium">
                        Proyecto creado con exito!
                      </span>{" "}
                      Puedes cerrar esta ventana!
                    </div>
                  )}
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(sendForm)}
                    noValidate
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Nombre
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Proyecto 1"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "El nombre es obligatorio",
                          },
                        })}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Descripción
                      </label>
                      <input
                        type="description"
                        name="description"
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Proyecto 1 descripción"
                        {...register("description")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Imagen
                      </label>
                      <div className="flex justify-center items-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col justify-center items-center w-full h-28 bg-gray-50 rounded border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg
                              className="mb-3 w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click para subbir
                              </span>{" "}
                              o arrastra una imagen
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="users"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Usuarios
                      </label>
                      {/* <Select
                        isMulti
                        name="users"
                        options={users}
                        className="basic-multi-select w-full"
                        classNamePrefix="select"
                        onChange={(selected) =>
                          setSelectedUsers([...selectedUsers, selected])
                        }
                      /> */}
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Crear proyecto
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        modal-backdrop
        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
      ></div>
    </>
  );
};
