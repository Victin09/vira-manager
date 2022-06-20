import React, { ReactNode, useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "../hooks/click-outside";

const Select: React.FC<{
  type: "PROJECT" | "PRIORITY";
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
}> = ({ type, selectedOption, setSelectedOption }) => {
  // const [selectedOption, setSelectedOption] = useState(defaultValue || "");
  const selectPlaceholder = "Choose an option";
  const projectOptions = ["Kanban", "Scrum"];

  return (
    <div className="dropdown">
      <span
        className="form-select"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedOption}
      </span>

      <ul
        className="dropdown-menu w-100 shadow"
        aria-labelledby="dropdownMenuLink"
      >
        {type === "PROJECT" ? (
          <>
            {projectOptions.map((projectOption, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => setSelectedOption(projectOption)}
                style={{ cursor: "pointer" }}
              >
                {projectOption}
              </li>
            ))}
          </>
        ) : (
          <>
            <li>Más alto</li>
            <li>Alto</li>
            <li>Medio</li>
            <li>Bajo</li>
            <li>Más bajo</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Select;
