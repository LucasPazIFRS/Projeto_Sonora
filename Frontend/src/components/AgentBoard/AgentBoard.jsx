import React, { useState, useEffect } from "react";
import "./AgentBoard.scss";

const AgentBoard = ({ messages, onWaitingChange }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [dots, setDots] = useState(".");

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
      onWaitingChange(false); // Comunica que não está esperando
    } else {
      setIsWaiting(true); // Ativa o estado de espera
      onWaitingChange(true); // Comunica que está esperando
    }
  };

  // Animação dos "..."
  useEffect(() => {
    if (isWaiting) {
      const interval = setInterval(() => {
        setDots((prev) => (prev === "..." ? "." : prev + "."));
      }, 500); // Atualiza os pontos a cada 500ms
      return () => clearInterval(interval);
    }
  }, [isWaiting]);

  return (
    <div className="agent-board">
      <div className="message-container">
        {isWaiting ? (
          <p className="waiting-animation">{dots}</p> // Exibe a animação de "..."
        ) : (
          <p className="message">{messages[currentMessageIndex]}</p>
        )}
      </div>
      {!isWaiting && (
        <button className="next-button" onClick={handleNextMessage}>
          Próximo
        </button>
      )}
    </div>
  );
};

export default AgentBoard;