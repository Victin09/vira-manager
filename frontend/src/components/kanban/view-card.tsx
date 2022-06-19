import { useEffect, useState } from "react";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { CardType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";

export const ViewCardModal = () => {
  const { selectedCard } = useKanban();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CardType>();
  const [editDescription, setEditDescription] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetch(
        `${getApiUrl()}/kanban/cards/${selectedCard._id}`
      );
      const result: ApiResponse<CardType> = await apiResponse.json();
      if (result.status === 200) {
        setData(result.data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKeyPressedDescription = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    console.log("e", e.key);
    if (e.key === "Enter") {
      console.log("ENTER");
      setEditDescription(false);
      updateCard();
    }
  };

  const updateCard = async () => {
    try {
      const apiResponse = await fetch(
        `${getApiUrl()}/kanban/cards/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: data?.description,
          }),
          credentials: "include",
        }
      );
      const result: ApiResponse<any> = await apiResponse.json();
      if (result.status === 200) {
        setEditDescription(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="cardModal"
        tabIndex={-1}
        aria-labelledby="cardModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cardModal">
                {data.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <span className="fw-semibold">Descripción:</span>
                  {!data.description ? (
                    <>
                      {!editDescription ? (
                        <p
                          className="bg-light p-2"
                          onClick={() => setEditDescription(true)}
                          style={{ cursor: "pointer" }}
                        >
                          No hay descripción para este card.
                        </p>
                      ) : (
                        <div className="mt-1">
                          <textarea
                            className="form-control mt-1"
                            rows={3}
                            autoFocus
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            onKeyPress={(e) => handleKeyPressedDescription(e)}
                          />
                          <div className="mt-2">
                            <button
                              className="btn btn-primary"
                              onClick={updateCard}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-secondary ms-1"
                              onClick={() => setEditDescription(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {!editDescription ? (
                        <p
                          className=""
                          onClick={() => setEditDescription(true)}
                        >
                          {data.description}
                        </p>
                      ) : (
                        <div className="mt-1">
                          <textarea
                            className="form-control mt-1"
                            rows={3}
                            autoFocus
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            onKeyPress={(e) => handleKeyPressedDescription(e)}
                          />
                          <div className="mt-2">
                            <button
                              className="btn btn-primary"
                              onClick={updateCard}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-secondary ms-1"
                              onClick={() => setEditDescription(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
