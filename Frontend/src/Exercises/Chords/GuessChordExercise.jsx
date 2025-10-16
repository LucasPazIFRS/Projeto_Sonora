import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import ScoreComplex from "../../components/ScoreComplex/ScoreComplex";
import "./GuessChordExercise.scss";

// Notas raiz possíveis
const ROOT_NOTES = ["C", "D", "E", "F", "G", "A", "B"];

// Tipos de acordes com intervalos (em semitons a partir da raiz)
const CHORD_TYPES = {
  maior: [0, 4, 7],
  menor: [0, 3, 7],
  "7": [0, 4, 7, 10],
  "m7": [0, 3, 7, 10],
  "sus4": [0, 5, 7],
  dim: [0, 3, 6],
};

// Converte nome da nota e oitava em número MIDI
const noteToMidi = (note, octave = 4) => {
  const SEMITONES = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };
  return SEMITONES[note] + 12 * (octave + 1);
};

// Converte MIDI de volta pra string ("C4", "D#5", etc)
const midiToNote = (midi) => {
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const note = NOTES[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${note}${octave}`;
};

// Gera notas de um acorde com base na raiz e tipo
const buildChord = (root, type) => {
  const intervals = CHORD_TYPES[type];
  if (!intervals) return [];
  const rootMidi = noteToMidi(root, 4);
  return intervals.map((i) => midiToNote(rootMidi + i));
};

const GuessChordExercise = () => {
  const [targetChord, setTargetChord] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    generateNewChord();
  }, []);

  const generateNewChord = async () => {
    const root = ROOT_NOTES[Math.floor(Math.random() * ROOT_NOTES.length)];
    const type = Object.keys(CHORD_TYPES)[Math.floor(Math.random() * Object.keys(CHORD_TYPES).length)];

    const notes = buildChord(root, type);
    const chordName = `${root}${type === "maior" ? "" : type}`;

    const synth = new Tone.PolySynth().toDestination();
    await Tone.start();
    synth.triggerAttackRelease(notes, "1n");

    setTargetChord({ name: chordName, notes });

    // Gera opções falsas (outras combinações aleatórias)
    const randomOptions = new Set([chordName]);
    while (randomOptions.size < 4) {
      const randomRoot = ROOT_NOTES[Math.floor(Math.random() * ROOT_NOTES.length)];
      const randomType = Object.keys(CHORD_TYPES)[Math.floor(Math.random() * Object.keys(CHORD_TYPES).length)];
      randomOptions.add(`${randomRoot}${randomType === "maior" ? "" : randomType}`);
    }
    setOptions([...randomOptions].sort(() => Math.random() - 0.5));
  };

  const handleChordClick = (choice) => {
    if (choice === targetChord.name) {
      setFeedback("✅ Acertou!");
    } else {
      setFeedback(`❌ Era ${targetChord.name}`);
    }
    setTimeout(() => {
      setFeedback("");
      generateNewChord();
    }, 2000);
  };

  return (
    <div className="guess-chord-exercise">
      <h2>Identifique o Acorde</h2>

      <div className="score-container">
        {targetChord && <ScoreComplex notes={targetChord.notes} />}
      </div>

      <div className="chord-options">
        {options.map((opt) => (
          <button key={opt} className="chord-button" onClick={() => handleChordClick(opt)}>
            {opt}
          </button>
        ))}
      </div>

      <div className={`feedback ${feedback ? "visible" : ""}`}>{feedback}</div>
    </div>
  );
};

export default GuessChordExercise;
