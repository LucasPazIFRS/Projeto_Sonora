import React, { useState } from "react";
import * as Tone from "tone";
import ScoreComplex from "../../components/ScoreComplex/ScoreComplex";
import { generateSimpleScale, NOTES } from "./ScaleUtils";

const ScaleExerciseVariation = () => {
  const [baseScale, setBaseScale] = useState(generateSimpleScale());
  const [selected, setSelected] = useState(null);

  // Gera as notas com uma nota errada
  const generateNotesWithError = () => {
    const notes = [...baseScale.notes];
    const wrongIndex = Math.floor(Math.random() * notes.length);
    let wrongNote;
    do {
      wrongNote = NOTES[Math.floor(Math.random() * NOTES.length)] + "4";
    } while (notes.includes(wrongNote));
    notes[wrongIndex] = wrongNote;
    return { notes, wrongIndex };
  };

  const { notes, wrongIndex } = generateNotesWithError();

  // Tocar escala com Tone.js
  const playScale = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    notes.forEach((note, i) => {
      synth.triggerAttackRelease(note, "8n", `+${i * 0.6}`); // 0.6s entre notas
    });
  };

  // Falar o nome da escala
  const speakScaleName = (scaleName) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(`Escala: ${scaleName}`);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (index) => {
    setSelected(index);
  };

  const newExercise = () => {
    const newScale = generateSimpleScale();
    setBaseScale(newScale);
    setSelected(null);
  };

  return (
    <div>
      <h3>💡 Qual nota está fora da escala?</h3>
      <button
        onClick={() => {
          speakScaleName(baseScale.name); // fala o nome da escala
          playScale(); // toca as notas
        }}
      >
        🎵 Tocar Escala
      </button>

      <ScoreComplex notes={notes} />

      <div style={{ marginTop: "1rem" }}>
        {notes.map((n, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{ margin: "0.3rem" }}
          >
            {n}
          </button>
        ))}
      </div>

      {selected !== null && (
        <p style={{ marginTop: "1rem" }}>
          {selected === wrongIndex
            ? "✅ Você encontrou a nota fora da escala!"
            : "❌ Essa não é a nota errada"}
        </p>
      )}

      <button onClick={newExercise} style={{ marginTop: "1rem" }}>
        🔄 Novo Exercício
      </button>
    </div>
  );
};

export default ScaleExerciseVariation;
