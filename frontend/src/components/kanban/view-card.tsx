import { useEffect, useState } from "react";
import { useQuill } from "../../hooks/use-quill";
import { useKanban } from "../../providers/kanban";
import { ApiResponse } from "../../types/api-response";
import { CardType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { formatToDate } from "../../utils/date";
import { renderPriorityStyle } from "../../utils/kanban";

import "quill/dist/quill.snow.css";
import { TextEditor } from "../text-editor";

export const ViewCardModal = () => {
  const { selectedCard } = useKanban();
  const { quill, quillRef } = useQuill();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CardType>();
  const [editDescription, setEditDescription] = useState<boolean>(false);
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

    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log("Text change!");
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [selectedCard, quill]);

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

  const handleText = (text: string) => {
    console.log("text", text);
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
                <TextEditor onChange={handleText} />
              </div>
              <div className="col-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
