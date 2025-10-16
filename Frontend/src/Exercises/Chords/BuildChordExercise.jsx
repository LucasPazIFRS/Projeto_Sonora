import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import ScoreComplex from "../../components/ScoreComplex/ScoreComplex";
import "./BuildChordExercise.scss";

const ROOT_NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const CHORD_TYPES = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  dom7: [0, 4, 7, 10],
  minMaj7: [0, 3, 7, 11],
};

const BuildChordExercise = () => {
  const [targetChord, setTargetChord] = useState(null);
  const [userChord, setUserChord] = useState({ root: null, type: null });
  const [feedback, setFeedback] = useState("");

  // Gera um acorde aleatório
  useEffect(() => {
    generateNewChord();
  }, []);

  const generateNewChord = async () => {
    const root = ROOT_NOTES[Math.floor(Math.random() * ROOT_NOTES.length)];
    const typeKeys = Object.keys(CHORD_TYPES);
    const type = typeKeys[Math.floor(Math.random() * typeKeys.length)];

    const baseNote = `${root}4`;
    const intervals = CHORD_TYPES[type];
    const notes = intervals.map(i => Tone.Frequency(baseNote).transpose(i).toNote());

    setTargetChord({ root, type, notes });

    // Toca o acorde
    const synth = new Tone.PolySynth().toDestination();
    await Tone.start();
    synth.triggerAttackRelease(notes, "1n");

    // Limpa o estado do usuário
    setUserChord({ root: null, type: null });
    setFeedback("");
  };

  // Atualiza o acorde construído pelo usuário
  const buildUserChordNotes = () => {
    if (!userChord.root || !userChord.type) return [];
    const baseNote = `${userChord.root}4`;
    const intervals = CHORD_TYPES[userChord.type];
    return intervals.map(i => Tone.Frequency(baseNote).transpose(i).toNote());
  };

  const handleRootClick = (note) => {
    setUserChord((prev) => ({ ...prev, root: note }));
  };

  const handleTypeClick = (type) => {
    setUserChord((prev) => ({ ...prev, type }));
  };

  const handleCheck = () => {
    const userNotes = buildUserChordNotes();
    const targetNotes = targetChord.notes;

    const sameNotes =
      userNotes.length === targetNotes.length &&
      userNotes.every((note) => targetNotes.includes(note));

    setFeedback(sameNotes ? "✅ Acertou!" : `❌ Era ${targetChord.root}${targetChord.type}`);
  };

  return (
    <div className="build-chord-exercise">
      <h2>Construa o acorde</h2>

      <div className="score-section">
        <h3>Acorde alvo:</h3>
        {targetChord && <ScoreComplex notes={targetChord.notes} />}

        <h3>Seu acorde:</h3>
        <ScoreComplex notes={buildUserChordNotes()} />
      </div>

      <div className="keyboard">
        {ROOT_NOTES.map((n) => (
          <button
            key={n}
            className={userChord.root === n ? "selected" : ""}
            onClick={() => handleRootClick(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="types">
        {Object.keys(CHORD_TYPES).map((t) => (
          <button
            key={t}
            className={userChord.type === t ? "selected" : ""}
            onClick={() => handleTypeClick(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="controls">
        <button onClick={handleCheck}>Verificar</button>
        <button onClick={generateNewChord}>Novo Acorde</button>
      </div>

      <div className={`feedback ${feedback ? "visible" : ""}`}>{feedback}</div>
    </div>
  );
};

export default BuildChordExercise;
