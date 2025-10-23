import React, { useState } from "react";
import ExLinker from "../components/ExLinker/ExLinker.jsx";
import chordsLogo1 from "../Assets/logos/logo_chords1.png";
import chordsLogo2 from "../Assets/logos/logo_chords2.png";
import AgentBoard from "../components/AgentBoard/AgentBoard.jsx";
import RoundButton from "../components/RoundButton/RoundButton.jsx";
import Agent from "../components/Agent/Agent.jsx";
import "../pages/pagesScss/ExerciseHub.scss";
import AgentFloat from "../components/AgentFloat/AgentFloat.jsx";

const ExerciseHubChords = () => {
  const messages = [
    "Bem-vindo ao módulo de exercícios de acordes!",
    "Aqui você vai testar seu ouvido e sua capacidade de identificar e montar acordes.",
    "Você pode escolher entre ouvir e adivinhar, ou construir o acorde manualmente!",
    "Vamos praticar harmonia? Escolha um exercício abaixo!",
  ];

  const [isSpeaking, setIsSpeaking] = useState(true);

  const handleWaitingChange = (waiting) => {
    setIsSpeaking(!waiting);
  };

  return (
    <div className="exercise-hub">
      <h2>Exercícios de Acordes</h2>

      {/* Bloco 1 — Adivinhar acordes */}
      <div className="button-container">
        <RoundButton>
          <h2>Exercício de Adivinhação de Acordes</h2>
          <br />
          <p>
            Neste exercício, você ouvirá um acorde e deverá identificar qual é.
            O objetivo é treinar seu ouvido harmônico, reconhecendo diferentes
            tipos de acordes como maiores, menores, diminutos, e com sétimas.
          </p>
        </RoundButton>
      </div>

      <div className="exlinker-container">
        <ExLinker
          logo={chordsLogo1}
          route="/exercises/Chords"
          title="Adivinhar Acordes"
        />

        {/* Bloco 2 — Construir e adivinhar */}
        <div className="button-container">
          <RoundButton>
            <h2>Exercício de Construção de Acordes</h2>
            <br />
            <p>
              Aqui você deve montar o acorde mostrado na tela. Escolha a nota
              raiz e o tipo de acorde (maior, menor, sétima, etc). Depois,
              verifique se o acorde que construiu corresponde ao mostrado na
              partitura!
            </p>
          </RoundButton>
        </div>

        <ExLinker
          logo={chordsLogo2}
          route="/exercises/chordbuilder"
          title="Construir Acordes"
        />
      </div>

      <div className="agent-board-container">
        <Agent isSpeaking={isSpeaking} />
        <AgentBoard messages={messages} onWaitingChange={handleWaitingChange} />
      </div>

      <AgentFloat />
    </div>
  );
};

export default ExerciseHubChords;
