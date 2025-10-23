import React, { useState } from "react";
import ExLinker from "../components/ExLinker/ExLinker.jsx";
import intervalLogo from "../Assets/logos/logo_intervalos.png"; // 🔹 Coloque a imagem desejada
import AgentBoard from "../components/AgentBoard/AgentBoard.jsx";
import RoundButton from "../components/RoundButton/RoundButton.jsx";
import Agent from "../components/Agent/Agent.jsx";
import "../pages/pagesScss/ExerciseHub.scss";

const ExerciseHubIntervalos = () => {
  const messages = [
    "Bem-vindo ao módulo de Intervalos!",
    "Aqui você poderá praticar o reconhecimento auditivo de intervalos musicais.",
    "Ouça as notas e tente identificar o intervalo correto.",
    "Você pode alternar entre os modos melódico e harmônico.",
    "Vamos treinar o ouvido juntos!",
  ];

  const [isSpeaking, setIsSpeaking] = useState(true);

  const handleWaitingChange = (waiting) => {
    setIsSpeaking(!waiting);
  };

  return (
    <div className="exercise-hub">
      <h2>Exercícios do Módulo de Intervalos</h2>

      <div className="button-container">
        <RoundButton>
          <h2>Identificação de Intervalos</h2>
          <br />
          <p>
            Neste exercício, você ouvirá dois sons — um após o outro (modo melódico)
            ou simultaneamente (modo harmônico). Seu objetivo é identificar o
            intervalo entre as notas, como uma terça maior ou uma quinta justa.
          </p>
        </RoundButton>
      </div>

      <div className="exlinker-container">
        <ExLinker
          logo={intervalLogo}
          route="/exercises/intervals"
          title="Identificar Intervalos"
        />
      </div>

      <div className="agent-board-container">
        <Agent isSpeaking={isSpeaking} />
        <AgentBoard messages={messages} onWaitingChange={handleWaitingChange} />
      </div>
    </div>
  );
};

export default ExerciseHubIntervalos;
