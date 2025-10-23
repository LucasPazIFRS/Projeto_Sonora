import React, { useState } from "react";
import * as Tone from "tone";
import ScoreComplex from "./ScoreComplex";
import { generateSimpleScale, NOTES } from "../../components/ScaleUtils/ScaleUtils";

const ScaleExerciseVariation = () => {
  const [baseScale, setBaseScale] = useState(generateSimpleScale());
  const [selected, setSelected] = useState(null);

  const notes = [...baseScale.notes];
  const wrongIndex = Math.floor(Math.random() * notes.length);
  let wrongNote;
  do {
    wrongNote = NOTES[Math.floor(Math.random() * NOTES.length)] + "4";
  } while (notes.includes(wrongNote));
  notes[wrongIndex] = wrongNote;

  const playScale = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    notes.forEach((note, i) => synth.triggerAttackRelease(note, "8n", `+${i * 0.5}`));
  };

  const handleSelect = (index) => {
    setSelected(index);
  };

  return (
    <div>
      <h3>💡 Qual nota está fora da escala?</h3>
      <button onClick={playScale}>🎵 Tocar Escala</button>
      <ScoreComplex notes={notes} />
      <div>
        {notes.map((n, i) => (
          <button key={i} onClick={() => handleSelect(i)}>
            {n}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p>
          {selected === wrongIndex
            ? "✅ Você encontrou a nota fora da escala!"
            : "❌ Essa não é a nota errada"}
        </p>
      )}
    </div>
  );
};

export default ScaleExerciseVariation;
