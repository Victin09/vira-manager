import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CardKanban } from "./card.kanban";

/* TEMPORAL. For a faster development */
const itemsFromBackend = [
  { id: "1234", content: "First task" },
  { id: "1235", content: "Second task" },
  { id: "1236", content: "Third task" },
  { id: "1237", content: "Fourth task" },
  { id: "1238", content: "Fifth task" }
];

const columnsFromBackend = {
  ["321"]: {
    name: "Requested",
    items: itemsFromBackend
  },
  ["3212"]: {
    name: "To do",
    items: []
  },
  ["3213"]: {
    name: "In Progress",
    items: []
  },
  ["3214"]: {
    name: "Done",
    items: []
  }
};
/* END TEMPORAL */

export const ListKanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="d-flex flex-column align-items-center" key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className={`${
                          snapshot.isDraggingOver ? "bg-primary" : "bg-light"
                        } shadow-sm rounded border p-2`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          width: 250,
                          minHeight: 300
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <CardKanban
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  />
                                  // <div
                                  //   className="card"
                                  //   ref={provided.innerRef}
                                  //   {...provided.draggableProps}
                                  //   {...provided.dragHandleProps}
                                  //   style={{
                                  //     userSelect: "none",
                                  //     padding: 16,
                                  //     margin: "0 0 8px 0",
                                  //     minHeight: "50px",
                                  //     backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                                  //     color: "white",
                                  //     ...provided.draggableProps.style
                                  //   }}
                                  // >
                                  //   {item.content}
                                  // </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
