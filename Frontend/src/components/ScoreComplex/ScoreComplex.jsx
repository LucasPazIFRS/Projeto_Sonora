import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
} from "vexflow";

const ScoreComplex = ({ notes = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    // Limpa render anterior
    containerRef.current.innerHTML = "";

    // Cria renderer e contexto
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(300, 150);
    const context = renderer.getContext();

    // Cria pauta
    const stave = new Stave(10, 20, 280);
    stave.addClef("treble").setContext(context).draw();

    // Converte notas tipo ["C4", "E4", "G4"] -> ["c/4", "e/4", "g/4"]
    const formattedNotes = notes
      .filter(Boolean)
      .map((n) => n.replace(/(\d)/, "/$1").toLowerCase());

    // Cria uma nota de acorde/intervalo
    const staveNote = new StaveNote({
      keys: formattedNotes,
      duration: "w", // semibreve — ocupa o compasso inteiro
      clef: "treble",
    });

    // Voice flexível (sem exigir batidas exatas)
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables([staveNote]);

    // Formata e desenha
    new Formatter().joinVoices([voice]).format([voice], 250);
    voice.draw(context, stave);
  }, [notes]);

  return <div ref={containerRef}></div>;
};

export default ScoreComplex;
