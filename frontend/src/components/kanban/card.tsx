import { Draggable } from "@react-forked/dnd";
import { useKanban } from "../../providers/kanban";
import { CardType } from "../../types/kanban";
import { formatToDate } from "../../utils/date";
import { renderPriorityStyle } from "../../utils/kanban";

export const Card = ({ data, index }: { data: CardType; index: number }) => {
  const { setSelectedCard } = useKanban();

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`card shadow-sm mb-2 ${
            snapshot.isDragging ? "bg-indigo-200" : "bg-gray-100"
          }`}
          data-bs-toggle="modal"
          data-bs-target="#cardModal"
          onClick={() => setSelectedCard(data)}
        >
          <div className="card-body" style={{ height: "8rem" }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span
                className={`badge ${renderPriorityStyle(data.priority)}`}
                style={{ fontSize: ".75em" }}
              >
                {data.priority}
              </span>
              <span className="fw-light">{formatToDate(data.createdAt)}</span>
            </div>
            <h4 className="text-truncate card-title fs-6">{data.name}</h4>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                {data.description && data.description !== "" && (
                  <i className="bi bi-list"></i>
                )}
                {data.comments.length > 0 && (
                  <i className="bi bi-chat-left-dots me-1"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
