import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import { ApiResponse } from "../../types/api-response";
import { ProjectType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";

const KanbanBacklogView = () => {
  const { projectId } = useParams();
  const { getUser } = useAuth();
  const [project, setProject] = useState<ProjectType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await fetch(
        `${getApiUrl()}/kanban/projects/${getUser()!.id}/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result: ApiResponse<ProjectType> = await apiResult.json();
      if (result.status === 200) {
        // result.data.users!.forEach(async (userId) => {
        //   const apiResponse = await fetch(`${getApiUrl()}/users/${userId}`, {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     credentials: "include",
        //   });
        //   const response: ApiResponse<User> = await apiResponse.json();
        //   if (response.status === 200) {
        //     setUsers([...users, response.data]);
        //   }
        // });
        setProject(result.data);
        setLoading(false);
      }
    };

    fetchData();
  }, [getUser, projectId]);

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
            <span className="fw-semibold fs-5">Backlog</span>
            {/* <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#createProjectModal"
            >
              Crear proyecto
            </button>
            <CreateKanbanProjectModal /> */}
          </div>
          <div className="mt-3">
            <div className="accordion accordion-flush" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Sprint 1
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBacklogView;
