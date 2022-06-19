import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Modal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("MODAL");
  }, []);

  return (
    <div className="modalDiv">
      <div className="modal-1">
        <h3>Modal</h3>
        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  );
};
