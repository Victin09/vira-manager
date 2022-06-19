import { Draggable } from "@react-forked/dnd";
import { useNavigate } from "react-router-dom";
import { useKanban } from "../../providers/kanban";
import { CardType } from "../../types/kanban";

export const Card = ({ data, index }: { data: CardType; index: number }) => {
  const { setDisplayCardModal, displayCardModal, setSelectedCard } =
    useKanban();
  const navigate = useNavigate();

  return (
    <>
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
            // onClick={() => handleClick()}
          >
            <div className="card-body" style={{ height: "6rem" }}>
              <h4 className="text-truncate card-title fs-6">{data.name}</h4>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-start my-2">
                  {data.description && data.description !== "" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  )}
                  {data.comments && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};
