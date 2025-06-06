import React, { useState } from "react";
import ExLinker from "../components/ExLinker/ExLinker.jsx";
import notesLogo from "../Assets/logos/logo_x1.jpg";
import notes2Logo from "../Assets/logos/logo_x2.jpg";
import AgentBoard from "../components/AgentBoard/AgentBoard.jsx";
import RoundButton from "../components/RoundButton/RoundButton.jsx";
import Agent from "../components/Agent/Agent.jsx";
import "../pages/pagesScss/ExerciseHub.scss";

const ExerciseHub = () => {
  const messages = [
    "Bem-vindo ao módulo de exercícios!",
    "Aqui você pode praticar suas habilidades musicais.",
    "Escolha um exercício para começar!",
    "Boa sorte e divirta-se aprendendo música!",
  ];

  const [isSpeaking, setIsSpeaking] = useState(true);

  const handleWaitingChange = (waiting) => {
    setIsSpeaking(!waiting); // Fala quando não está esperando
  };

  return (
    <div className="exercise-hub">
      <h2>Exercícios do Módulo</h2>
      <div className="button-container">
        <RoundButton>
          <h2>Exercício de Notas Simples</h2>
          <br />{" "}
          <p>
            Neste exercício, você irá praticar o reconhecimento de notas
            musicais simples. O objetivo é identificar corretamente as notas em
            uma partitura, tocando as no piano disponível na tela.
          </p>
        </RoundButton>
      </div>

      <div className="exlinker-container">
        <ExLinker
          logo={notesLogo}
          route="/exercises/notes"
          title="Notas Simples"
        />

        <div className="button-container">
          <RoundButton>
          <h2>Exercício de Notas Avançado</h2>
          <br />{" "}
          <p>
            Neste exercício, você irá praticar o reconhecimento de notas
            musicais avançadas. O objetivo é identificar corretamente as notas normais, e as notas acidentais 
            tocando as no piano disponível na
            tela.
          </p>

          </RoundButton>
        </div>

        <ExLinker
          logo={notes2Logo}
          route="/exercises/notes2"
          title="Notas Avançado"
        />
      </div>

      <div className="agent-board-container">
        {/* Alinha o Agent à esquerda do AgentBoard */}
        <Agent isSpeaking={isSpeaking} />
        <AgentBoard messages={messages} onWaitingChange={handleWaitingChange} />
      </div>
    </div>
  );
};

export default ExerciseHub;
