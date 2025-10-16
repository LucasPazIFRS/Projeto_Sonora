//sistema toca
//usuário identifica se é um acorde maior ou menor
import React, { useEffect, useState } from "react";
import "./ChordsSimples.scss";

const ChordsSimples = () => {
  const chords = ["C", "D", "E", "F", "G", "A", "B"];
  const [currentChord, setCurrentChord] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newChord = chords[Math.floor(Math.random() * chords.length)];
      setCurrentChord(newChord);
    }, 2000); // Troca de acorde a cada 2 segundos

    return () => clearInterval(interval);
  }, [chords]);

  return (
    <div className="chords-simples">
      <h2>Identifique o Acorde</h2>
      <div className="current-chord">{currentChord}</div>
    </div>
  );
};

export default ChordsSimples;


//ele fez isso aqui só em sugestão automática ksaksksks wtf chat copilot
