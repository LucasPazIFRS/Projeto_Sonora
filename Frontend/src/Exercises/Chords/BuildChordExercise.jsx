import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import ScoreComplex from "../../components/ScoreComplex/ScoreComplex";
import "./BuildChordExercise.scss";

// 🔹 Notas básicas
const ROOT_NOTES = [
  "C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B",
];

// 🔹 Base/Variação do acorde
const CHORD_BASES = {
  Maj: [0, 4],
  min: [0, 3],
  dim: [0, 3],
  aug: [0, 4],
  sus: [0, 5],
  dom: [0, 4],
  minmaj: [0, 3],
};

// 🔹 Extensões
const EXTENSIONS = { 7: 10, maj7: 11, 9: 14, 11: 17, 13: 21 };

// 🔹 Adições
const ADD_INTERVALS = { 4: 5, 6: 9, 9: 14, 11: 17, 13: 21 };

// 🔹 Quinta justa
const FIFTH_INTERVAL = 7;

// 🔧 Normaliza acidentes
function normalizeNoteName(note) {
  return note
    .replace("Db", "C#")
    .replace("Gb", "F#")
    .replace("Ab", "G#")
    .replace("Eb", "D#")
    .replace("Bb", "A#");
}

const BuildChordExercise = () => {
  const [targetChord, setTargetChord] = useState(null);
  const [userChord, setUserChord] = useState({ root: null, base: null, extension: null, add: null, fifth: false });
  const [feedback, setFeedback] = useState("");
  const [synth] = useState(() => new Tone.PolySynth().toDestination());

  useEffect(() => { generateNewChord(); }, []);

  const generateNewChord = async () => {
    const root = ROOT_NOTES[Math.floor(Math.random() * ROOT_NOTES.length)];
    const base = Object.keys(CHORD_BASES)[Math.floor(Math.random() * Object.keys(CHORD_BASES).length)];
    const extension = Math.random() < 0.5 ? null : Object.keys(EXTENSIONS)[Math.floor(Math.random() * Object.keys(EXTENSIONS).length)];
    const add = Math.random() < 0.5 ? null : Object.keys(ADD_INTERVALS)[Math.floor(Math.random() * Object.keys(ADD_INTERVALS).length)];
    const fifth = Math.random() < 0.5;

    const notes = buildChordNotes(root, base, extension, add, fifth);

    setTargetChord({ root, base, extension, add, fifth, notes });
    await Tone.start();
    synth.triggerAttackRelease(notes, "1n");

    setUserChord({ root: null, base: null, extension: null, add: null, fifth: false });
    setFeedback("");
  };

  const buildChordNotes = (root, base, extension, add, fifth) => {
    if (!CHORD_BASES[base]) return [];
    let intervals = [...CHORD_BASES[base]];
    if (fifth && base !== "sus") intervals.push(FIFTH_INTERVAL);
    if (extension) intervals.push(EXTENSIONS[extension]);
    if (add) intervals.push(ADD_INTERVALS[add]);
    const baseNote = `${root}4`;
    return intervals.map((i) => normalizeNoteName(Tone.Frequency(baseNote).transpose(i).toNote()));
  };

  const buildUserChordNotes = () => {
    if (!userChord.root || !userChord.base) return [];
    return buildChordNotes(userChord.root, userChord.base, userChord.extension, userChord.add, userChord.fifth);
  };

  // 🎛️ Handlers
  const handleRootClick = (note) => setUserChord((p) => ({ ...p, root: note }));
  const handleBaseClick = (base) => setUserChord((p) => ({ ...p, base }));
  const handleExtensionClick = (ext) => setUserChord((p) => ({ ...p, extension: ext }));
  const handleAddClick = (add) => setUserChord((p) => ({ ...p, add }));
  const handleFifthClick = () => setUserChord((p) => ({ ...p, fifth: !p.fifth }));
  const handleClear = (field) => setUserChord((p) => ({ ...p, [field]: field === "fifth" ? false : null }));

  // ✅ Verificação
  const handleCheck = () => {
    const userNotes = buildUserChordNotes();
    const targetNotes = targetChord.notes;
    const sameNotes = userNotes.length === targetNotes.length && userNotes.every((note) => targetNotes.includes(note));
    setFeedback(sameNotes ? "✅ Acertou!" : `❌ Era ${targetChord.root}${targetChord.base}${targetChord.extension || ""}${targetChord.add || ""}${targetChord.fifth ? " +5" : ""}`);
  };

  // 🔊 Ouvir acordes
  const handlePlayTarget = async () => { if (!targetChord) return; await Tone.start(); synth.triggerAttackRelease(targetChord.notes, "1n"); };
  const handlePlayUser = async () => { const notes = buildUserChordNotes(); if (!notes.length) return; await Tone.start(); synth.triggerAttackRelease(notes, "1n"); };

  // 🔊 Arpejos
  const handlePlaySequential = async () => {
    const notes = buildUserChordNotes(); if (!notes.length) return; await Tone.start();
    const synthSeq = new Tone.Synth().toDestination(); const now = Tone.now();
    notes.forEach((note, i) => synthSeq.triggerAttackRelease(note, "8n", now + i * 0.5));
  };
  const handlePlayTargetSequential = async () => {
    if (!targetChord) return; await Tone.start();
    const synthSeq = new Tone.Synth().toDestination(); const now = Tone.now();
    targetChord.notes.forEach((note, i) => synthSeq.triggerAttackRelease(note, "8n", now + i * 0.5));
  };

  return (
    <div className="build-chord-exercise">
      <h2>Construa o acorde</h2>

      <div className="score-section">
        <h3>Acorde alvo:</h3>
        {targetChord && <ScoreComplex notes={targetChord.notes} />}

        <h3>Seu acorde:</h3>
        <ScoreComplex notes={buildUserChordNotes()} onNoteClick={(note) => handleRootClick(note.replace(/\d/, ""))} />
      </div>

      <div className="selectors">
        {/** RAIZ */}
        <div className="section">
          <h4>Raiz <button className="clear-btn" onClick={() => handleClear("root")}>Limpar</button></h4>
          <div className="button-group">{ROOT_NOTES.map((n) => <button key={n} className={userChord.root === n ? "selected" : ""} onClick={() => handleRootClick(n)}>{n}</button>)}</div>
        </div>
        {/** VARIAÇÃO */}
        <div className="section">
          <h4>Variação <button className="clear-btn" onClick={() => handleClear("base")}>Limpar</button></h4>
          <div className="button-group">{Object.keys(CHORD_BASES).map((b) => <button key={b} className={userChord.base === b ? "selected" : ""} onClick={() => handleBaseClick(b)}>{b}</button>)}</div>
        </div>
        {/** EXTENSÃO */}
        <div className="section">
          <h4>Extensão <button className="clear-btn" onClick={() => handleClear("extension")}>Limpar</button></h4>
          <div className="button-group">{Object.keys(EXTENSIONS).map((e) => <button key={e} className={userChord.extension === e ? "selected" : ""} onClick={() => handleExtensionClick(e)}>{e}</button>)}</div>
        </div>
        {/** ADIÇÃO */}
        <div className="section">
          <h4>Adição <button className="clear-btn" onClick={() => handleClear("add")}>Limpar</button></h4>
          <div className="button-group">{Object.keys(ADD_INTERVALS).map((a) => <button key={a} className={userChord.add === a ? "selected" : ""} onClick={() => handleAddClick(a)}>{a}</button>)}</div>
        </div>
        {/** QUINTA */}
        <div className="section">
          <h4>Quinta <button className="clear-btn" onClick={() => handleClear("fifth")}>Limpar</button></h4>
          <div className="button-group"><button className={userChord.fifth ? "selected" : ""} onClick={handleFifthClick}>5ª</button></div>
        </div>
      </div>

      <div className="controls">
        <button onClick={handleCheck}>Verificar</button>
        <button onClick={generateNewChord}>Novo Acorde</button>
        <button onClick={handlePlayTarget}>🔊 Ouvir Alvo</button>
        <button onClick={handlePlayUser}>🎵 Ouvir Seu</button>
        <button onClick={handlePlaySequential}>🎹 Tocar Seu em sequência</button>
        <button onClick={handlePlayTargetSequential}>🎼 Tocar Alvo em sequência</button>
      </div>

      <div className={`feedback ${feedback ? "visible" : ""}`}>{feedback}</div>
    </div>
  );
};

export default BuildChordExercise;
