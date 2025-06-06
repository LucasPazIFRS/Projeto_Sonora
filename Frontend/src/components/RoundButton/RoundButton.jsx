import React, { useState } from "react";
import "./RoundButton.scss";

const RoundButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBoard = () => {
    setIsOpen(!isOpen);
  };

  const closeBoard = () => {
    setIsOpen(false);
  };

  return (
    <div className="round-button-container">
      <button className="round-button" onClick={toggleBoard}>
       ➢
      </button>
      {isOpen && (
        <div className="board-overlay" onClick={closeBoard}>
          <div className="board" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoundButton;