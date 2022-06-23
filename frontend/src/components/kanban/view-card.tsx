import { useEffect, useState } from "react";
import htmlParser from "html-react-parser";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { CardType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { formatToDate } from "../../utils/date";
import { renderPriorityStyle } from "../../utils/kanban";

import "quill/dist/quill.snow.css";
import { TextEditor } from "../text-editor";
import { getInitials } from "../../utils/text";
import { useAuth } from "../../providers/auth";
import Select from "../select";

export const ViewCardModal = () => {
  const { selectedCard, setSelectedCard } = useKanban();
  const { getUser } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CardType>();
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>();
  const [addComment, setAddComment] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>();
  const [priorities, setPriorities] = useState<string[]>([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetch(
        `${getApiUrl()}/kanban/cards/${selectedCard?._id}`,
        {
          credentials: "include",
        }
      );
      const result: ApiResponse<CardType> = await apiResponse.json();
      if (result.status === 200) {
        setData(result.data);
        setLoading(false);
      }
    };

    console.log({ selectedCard });
    // if (selectedCard) fetchData();
  }, [selectedCard]);

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
        `${getApiUrl()}/kanban/cards/${selectedCard?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: newDescription,
            comments: [...selectedCard!.comments, newComment],
          }),
          credentials: "include",
        }
      );
      const result: ApiResponse<CardType> = await apiResponse.json();
      if (result.status === 200) {
        setSelectedCard(result.data);
        setEditDescription(false);
        setAddComment(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleText = (text: string) => {
    setNewDescription(text);
  };

  return (
    <div
      className="modal fade"
      id="cardModal"
      tabIndex={-1}
      aria-labelledby="cardModal"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            {selectedCard && (
              <h5 className="modal-title" id="cardModal">
                {selectedCard?.name}
              </h5>
            )}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-8">
                <div className="d-flex flex-column">
                  <span className="fw-semibold">Descripción:</span>
                  {editDescription ? (
                    <div className="d-flex flex-column">
                      <TextEditor
                        value={selectedCard?.description}
                        onChange={handleText}
                      />
                      <div className="d-flex mt-2">
                        <button
                          className="btn btn-primary"
                          onClick={updateCard}
                        >
                          Guardar
                        </button>
                        <button
                          className="btn btn-secondary ms-2"
                          onClick={() => setEditDescription(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {!selectedCard?.description ? (
                        <span
                          className="w-100 p-2 rounded-1"
                          onClick={() => setEditDescription(true)}
                        >
                          No hay ninguna descripción
                        </span>
                      ) : (
                        <div
                          className="w-100 ql-snow"
                          style={{ cursor: "pointer" }}
                          onClick={() => setEditDescription(true)}
                        >
                          <div className="w-100 ql-editor">
                            {htmlParser(selectedCard?.description)}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="d-flex flex-column mt-3">
                  <span className="fw-semibold mb-2">Comentarios:</span>
                  <div className="d-flex align-items-center">
                    <div
                      className="p-2 me-2 d-flex align-items-center justify-content-center rounded-circle bg-primary"
                      style={{ height: "2.5em" }}
                    >
                      <span className="text-white">
                        {getInitials(getUser()!.fullname)}
                      </span>
                    </div>
                    {!addComment ? (
                      <div
                        className="border rounded p-2 w-100"
                        style={{ cursor: "pointer" }}
                        onClick={() => setAddComment(true)}
                      >
                        Añade un comentario
                      </div>
                    ) : (
                      <div className="d-flex flex-column w-100">
                        <textarea
                          className="form-control"
                          autoFocus
                          rows={2}
                          placeholder="Añade un comentario"
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="d-flex mt-2">
                          <button
                            className="btn btn-primary"
                            onClick={updateCard}
                          >
                            Guardar
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setAddComment(false)}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="d-flex flex-column p-2">
                    {selectedCard?.comments.map((comment, index) => (
                      <span key={index}>{comment}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-4">
                {/* <div className="d-flex flex-column">
                  <span className="fw-semibold">Prioridad:</span>
                  <Select  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
