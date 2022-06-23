import React, { ReactNode, useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "../hooks/click-outside";

const Select: React.FC<{
  selectedOption?: string;
  setSelectedOption: (selectedOption: string) => void;
}> = ({ selectedOption, setSelectedOption }) => {
  const selectPlaceholder = "Selecciona una prioridad";
  const priorities = ["HIGHEST", "HIGH", "NORMAL", "LOW", "LOWEST"];

  useEffect(() => {
    console.log({ selectedOption });
  }, []);

  const parsePriorityText = (text: string = "NORMAL") => {
    switch (text) {
      case "HIGHEST":
        return "La más alta";
      case "HIGH":
        return "Alta";
      case "NORMAL":
        return "Normal";
      case "LOW":
        return "Baja";
      case "LOWEST":
        return "La más baja";
      default:
        break;
    }
  };

  return (
    <div className="dropdown">
      <span
        className="form-select"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {parsePriorityText(selectedOption)}
      </span>

      <ul
        className="dropdown-menu w-100 shadow"
        aria-labelledby="dropdownMenuLink"
      >
        {priorities
          .filter((i) => {
            return selectedOption?.toUpperCase() !== i.toUpperCase();
          })
          .map((priority, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => setSelectedOption(priority)}
              style={{ cursor: "pointer" }}
            >
              {parsePriorityText(priority)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;
