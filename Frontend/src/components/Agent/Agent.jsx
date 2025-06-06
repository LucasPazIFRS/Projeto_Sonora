import React from "react";
import "./Agent.scss";

const Agent = ({ isSpeaking }) => {
  const speakingGif = "/path/to/speaking.gif"; // Substitua pelo caminho do GIF de fala
  const waitingImage = "/path/to/static-image.png"; // Substitua pelo caminho da imagem estática

  return (
    <div className="agent">
      <img
        src={isSpeaking ? speakingGif : waitingImage}
        alt={isSpeaking ? "Agente falando" : "Agente esperando"}
        className="agent-image"
      />
    </div>
  );
};

export default Agent;