import React, { useState } from "react";
import * as Tone from "tone";
import ScoreComplex from "../../components/ScoreComplex/ScoreComplex";
import { generateSimpleScale } from "./ScaleUtils";

const ScaleExerciseSimples = () => {
  const [scale, setScale] = useState(generateSimpleScale());
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);

  const playScale = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    scale.notes.forEach((note, i) => synth.triggerAttackRelease(note, "8n", `+${i * 0.5}`));
  };

  const handleSelect = (name) => {
    setSelected(name);
    setCorrect(name === scale.name);
  };

  const newExercise = () => {
    setScale(generateSimpleScale());
    setSelected(null);
    setCorrect(null);
  };

  return (
    <div>
      <h3>💡 Qual é a Escala? (Simples)</h3>
      <button onClick={playScale}>🎵 Tocar Escala</button>
      <ScoreComplex notes={scale.notes} />
      <div>
        <button onClick={() => handleSelect(scale.name)}>Minha Resposta</button>
      </div>
      {selected && <p>{correct ? "✅ Correto!" : "❌ Errado"}</p>}
      <button onClick={newExercise}>🔄 Novo Exercício</button>
    </div>
  );
};

export default ScaleExerciseSimples;
