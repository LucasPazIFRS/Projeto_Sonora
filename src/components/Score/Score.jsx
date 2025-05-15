import React, { useEffect, useRef } from "react";
import Vex from "vexflow";

const Score = ({ notes }) => {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    // Limpa a notação anterior
    scoreRef.current.innerHTML = "";

    // Inicializa o VexFlow
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(scoreRef.current, VF.Renderer.Backends.SVG);

    // Configura a render
    renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#fff");

    // Cria a pauta
    const stave = new VF.Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Converte as notas para o formato do VexFlow
    const vexNotes = notes.map((note) => {
      return new VF.StaveNote({
        clef: "treble",
        keys: [note.toLowerCase()], // Converte nota pra lowercase pro VexFlow
        duration: "q", // Duração da nota (quarter note)
      });
    });

    // Cria uma voz em 4/4
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(vexNotes);

    // Formata e inclui as notas na pauta
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Renderiza a voz
    voice.draw(context, stave);
  }, [notes]);

  return <div ref={scoreRef}></div>;
};

export default Score;