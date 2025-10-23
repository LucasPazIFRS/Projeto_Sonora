import React, { useState } from "react";
import * as Tone from "tone";
import ScoreComplex from "../../components/ScoreComplex/ScoreComplex";
import { NOTES, generateModes } from "./ScaleUtils";

const ScaleExerciseAdvanced = () => {
  const root = NOTES[Math.floor(Math.random() * NOTES.length)];
  const modes = generateModes(root);
  const modeNames = Object.keys(modes);

  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [currentMode] = useState(modeNames[Math.floor(Math.random() * modeNames.length)]);

  const playScale = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    modes[currentMode].forEach((note, i) => synth.triggerAttackRelease(note, "8n", `+${i * 0.5}`));
  };

  const handleSelect = (mode) => {
    setSelected(mode);
    setCorrect(mode === currentMode);
  };

  return (
    <div>
      <h3>💡 Qual é o modo grego? (Avançado)</h3>
      <button onClick={playScale}>🎵 Tocar Escala</button>
      <ScoreComplex notes={modes[currentMode]} />
      <div>
        {modeNames.map((mode) => (
          <button key={mode} onClick={() => handleSelect(mode)}>
            {mode}
          </button>
        ))}
      </div>
      {selected && <p>{correct ? "✅ Correto!" : "❌ Errado"}</p>}
    </div>
  );
};

export default ScaleExerciseAdvanced;
