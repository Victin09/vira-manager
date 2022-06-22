import { useEffect, useState } from "react";
import { Droppable, Draggable } from "@react-forked/dnd";
import { useParams } from "react-router-dom";
import { CardType, ListType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { Card } from "./card";
import { ApiResponse } from "../../types/api-response";

export const List = ({ data, index }: { data: ListType; index: number }) => {
  const { projectId } = useParams();
  const [addTask, setAddTask] = useState<boolean>(false);
  const [newCardName, setNewCardName] = useState<string>("");

  const [cardsState, setCardsState] = useState<CardType[]>([]);

  useEffect(() => {
    setCardsState(data.cards);
  }, [data, data.cards]);

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log("e", e.key);
    if (e.key === "Enter") {
      setAddTask(false);
      createNewCard();
    }
  };

  const createNewCard = async () => {
    try {
      const apiResponse = await fetch(`${getApiUrl()}/kanban/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCardName,
          description: "",
          list: data._id,
          project: projectId,
          users: [],
        }),
      });

      const result: ApiResponse<any> = await apiResponse.json();
      if (result.status === 201) {
        const newState = [...cardsState];
        newState.push(result.data);
        setCardsState(newState);
        setAddTask(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="me-3"
        >
          <div className="h-100" style={{ width: "16rem" }}>
            {/* <div
              className="d-flex align-items-center justify-content-between w-100 position-fixed bg-light"
              style={{ zIndex: 50, width: "16rem", top: "0px" }}
            > */}
            <div
              {...provided.dragHandleProps}
              className="px-2 py-2 d-flex position-sticky bg-light rounded"
              style={{ zIndex: 50, width: "16rem", top: "0px" }}
              // style={{ width: "16rem" }}
            >
              <div className="d-flex align-items-center">
                <span className="text-truncate fs-6">
                  {`${data.name} ${data.cards.length} ${
                    data.cards.length > 1 ? "Incidencia" : "Incidencias"
                  }`.toUpperCase()}
                </span>
                {/* <span className="ms-2">
                  {data.cards.length}
                  {` ${data.cards.length > 1 ? "Incidencia" : "Incidencias"}`}
                </span> */}
              </div>
            </div>
            {/* </div> */}
            <Droppable droppableId={data._id} type="task">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`p-2 ${
                    snapshot.isDraggingOver ? "bg-gray-400" : "bg-light"
                  }`}
                  style={{ minHeight: "3em" }}
                >
                  {cardsState.map((t, i) => (
                    <Card data={t} index={i} key={t._id} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="bg-light mb-2">
              {!addTask ? (
                <div
                  className="d-flex flex-grow-1 justify-content-center pb-2"
                  onClick={() => setAddTask(true)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="font-bold">
                    <i className="bi bi-plus"></i> Añadir tarea
                  </span>
                </div>
              ) : (
                <textarea
                  className="form-control mx-2 mb-2"
                  style={{ width: "93%" }}
                  placeholder="¿Qué se debe hacer?"
                  required
                  autoFocus
                  rows={3}
                  onChange={(e) => setNewCardName(e.target.value)}
                  onKeyPress={(e) => handleKeyPressed(e)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
