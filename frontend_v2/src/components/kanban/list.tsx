import { useEffect, useState } from "react";
import { Droppable, Draggable } from "@react-forked/dnd";
import { useParams } from "react-router-dom";
import { CardType, ListType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { Card } from "./card";
import { ApiResponse } from "../../types/api-response";

export const List = (data: ListType, index: number) => {
  const { projectId } = useParams();
  const [addTask, setAddTask] = useState<boolean>(false);
  const [newCardName, setNewCardName] = useState<string>("");

  const [cardsState, setCardsState] = useState<CardType[]>([]);

  useEffect(() => {
    setCardsState(data.cards);
  }, [data]);

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log("e", e.key);
    if (e.key === "Enter") {
      console.log("ENTER");
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
          className="mr-5 rounded shadow-sm bg-gray-200"
        >
          <div style={{ width: "16rem" }}>
            <div className="d-flex align-items-center justify-content-between w-full">
              <div {...provided.dragHandleProps} className="px-2 py-2 w-full">
                <h2 className={"text-truncate fw-bold fs-5"}>{data.name}</h2>
              </div>
            </div>
            <Droppable droppableId={data._id} type="task">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`py-2 bg-gray-200 px-2 ${
                    snapshot.isDraggingOver ? "bg-gray-400" : ""
                  }`}
                  // style={{ maxHeight: 'calc(100vh - 15em)' }}
                >
                  {cardsState.map((t, i) => (
                    <Card
                      data={t}
                      list={data.name}
                      project={projectId}
                      index={i}
                      key={t._id}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {!addTask ? (
              <div
                className="d-flex cursor-pointer justify-content-center"
                onClick={() => setAddTask(true)}
              >
                <span className="font-bold">+ Añadir tarea</span>
              </div>
            ) : (
              <textarea
                className="form-control mx-2"
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
      )}
    </Draggable>
  );
};
