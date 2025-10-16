import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Accidental,
} from "vexflow";
import "./ScoreComplex.scss";

const ScoreComplex = ({ notes }) => {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) {
      console.error("No notes provided to render.");
      return;
    }

    console.log("Notes passed to ScoreComplex:", notes); // Debug

    // Limpa a partitura/notação passada
    scoreRef.current.innerHTML = "";

    // Inicializa o VexFlow
    const renderer = new Renderer(scoreRef.current, Renderer.Backends.SVG);

    // Renderer
    renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#fff");

    // Cria a Partitura
    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Converte todas as notas para o formato VexFlow
    const vexNotes = notes.map((note) => {
      const match = note.match(/([A-Ga-g])(#|b)?(\d)/); // Garante que a oitava/acidente/pitch seja o mesmo do VexFlow
      if (!match) return null;

      const [_, pitch, accidental, octave] = match; // Desestrutura os grupos
      const formattedNote = `${pitch.toLowerCase()}/${octave}`; // Formata a nota recebida no Tone.js para VexFlow

      // Cria StaveNote (Nota na partitura)
      const vexNote = new StaveNote({
        clef: "treble",
        keys: [formattedNote], // Usa a nota formatada corretamente
        duration: "q", // Quarter note
      });

      // Adiciona o símbolo de acidentes
      if (accidental) {
        vexNote.addModifier(new Accidental(accidental), 0); // Acidentes
      }

      return vexNote;
    }).filter((note) => note !== null); // Remove notas inválidas

    // Verifica se há notas suficientes
    if (vexNotes.length === 0) {
      console.error("No valid notes to render.");
      return;
    }

    // Adiciona notas de descanso para completar o número de batidas
    const totalBeats = 4; // Número total de batidas em 4/4
    const missingBeats = totalBeats - vexNotes.length;

    for (let i = 0; i < missingBeats; i++) {
      vexNotes.push(
        new StaveNote({
          clef: "treble",
          keys: ["b/4"], // Nota de descanso
          duration: "qr", // Quarter rest
        })
      );
    }

    // Voz dinâmica baseada no número de notas
    const voice = new Voice({ num_beats: totalBeats, beat_value: 4 });
    voice.addTickables(vexNotes);

    // Formata e justifica notas na partitura
    const formatter = new Formatter().joinVoices([voice]).format([voice], 400);

    // Render na voz
    voice.draw(context, stave);
  }, [notes]);

  return <div ref={scoreRef} className="score-complex"></div>;
};

export default ScoreComplex;