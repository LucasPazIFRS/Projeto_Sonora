import React, { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from "vexflow";

const ScoreComplex = ({ notes = [], onNoteClick }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    containerRef.current.innerHTML = "";

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(300, 150);
    const context = renderer.getContext();

    const stave = new Stave(10, 20, 280);
    stave.addClef("treble").setContext(context).draw();

    const formattedNotes = notes
      .filter(Boolean)
      .map((n) => n.replace(/(\d)/, "/$1").toLowerCase());

    const staveNote = new StaveNote({
      keys: formattedNotes,
      duration: "w",
      clef: "treble",
    });

    // Adiciona acidentes
    formattedNotes.forEach((k, i) => {
      if (k.includes("#")) staveNote.addModifier(new Accidental("#"), i);
      if (k.includes("b")) staveNote.addModifier(new Accidental("b"), i);
    });

    // Voice flexível
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables([staveNote]);

    new Formatter().joinVoices([voice]).format([voice], 250);
    voice.draw(context, stave);

    // Tornar notas clicáveis
    if (onNoteClick) {
      const svg = containerRef.current.querySelector("svg");
      const keyElems = svg.querySelectorAll(".vf-notehead");

      keyElems.forEach((elem, index) => {
        elem.style.cursor = "pointer";
        elem.addEventListener("click", () => {
          onNoteClick(notes[index]);
        });
      });
    }
  }, [notes, onNoteClick]);

  return <div ref={containerRef}></div>;
};

export default ScoreComplex;
