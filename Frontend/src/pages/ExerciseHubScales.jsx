import React, { useState } from "react";
import ExLinker from "../components/ExLinker/ExLinker.jsx";
import simpleLogo from "../Assets/logos/logo_scale1.png";
import advancedLogo from "../Assets/logos/logo_scale2.png";
import variationLogo from "../Assets/logos/logo_scale3.png";
import AgentBoard from "../components/AgentBoard/AgentBoard.jsx";
import RoundButton from "../components/RoundButton/RoundButton.jsx";
import Agent from "../components/Agent/Agent.jsx";
import "../pages/pagesScss/ExerciseHub.scss"; // Mantendo o mesmo estilo
import AgentFloat from "../components/AgentFloat/AgentFloat.jsx";

const ExerciseHubScales = () => {
  const messages = [
    "Bem-vindo ao módulo de exercícios de escalas musicais!",
    "Aqui você pode praticar escalas maiores, menores e modos gregos.",
    "Escolha um exercício para começar!",
    "Boa sorte e divirta-se aprendendo escalas!",
  ];

  const [isSpeaking, setIsSpeaking] = useState(true);

  const handleWaitingChange = (waiting) => {
    setIsSpeaking(!waiting);
  };

  return (
    <div className="exercise-hub">
      <h2>Exercícios de Escalas</h2>

      <div className="button-container">
        <RoundButton>
          <h2>Exercício de Escalas Simples</h2>
          <br />
          <p>
            Neste exercício, você irá praticar o reconhecimento de escalas maiores e menores.
            O sistema escolherá uma tônica aleatória e gerará a escala correspondente.
          </p>
        </RoundButton>
      </div>

      <div className="exlinker-container">
        <ExLinker
          logo={simpleLogo}
          route="/exercises/scale/simple"
          title="Escalas Simples"
        />

        <div className="button-container">
          <RoundButton>
            <h2>Exercício de Escalas Avançadas</h2>
            <br />
            <p>
              Aqui você irá praticar todos os modos gregos famosos (Jônio, Dórico, Frígio,
              Lídio, Mixolídio, Eólio e Lócrio). O sistema escolherá uma tônica e gerará
              a escala no modo correspondente para identificação.
            </p>
          </RoundButton>
        </div>

        <ExLinker
          logo={advancedLogo}
          route="/exercises/scale/advanced"
          title="Escalas Avançadas"
        />

        <div className="button-container">
          <RoundButton>
            <h2>Exercício de Escalas com Nota Errada</h2>
            <br />
            <p>
              Neste exercício, você deverá identificar a nota que está fora da escala.
              O sistema irá gerar uma escala simples e aleatoriamente alterará uma nota.
            </p>
          </RoundButton>
        </div>

        <ExLinker
          logo={variationLogo}
          route="/exercises/scale/variation"
          title="Escalas com Nota Errada"
        />
      </div>

      <div className="agent-board-container">
        <Agent isSpeaking={isSpeaking} />
        <AgentBoard messages={messages} onWaitingChange={handleWaitingChange} />
      </div>
    </div>
  );
};

export default ExerciseHubScales;
