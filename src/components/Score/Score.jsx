import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Accidental,
} from "vexflow"; //pegando essas em específico do vexFlow pq ele é chato

const Score = ({ notes }) => {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    console.log("Notes passed to Score:", notes); // Debug

    // limpa a partitura/notação passada
    scoreRef.current.innerHTML = "";

    // Inicializa o VexFlow
    const renderer = new Renderer(scoreRef.current, Renderer.Backends.SVG);

    //renderer
    renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#fff");

    // Cria a Partitura
    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Converta última nota pro formato vexFlowx
    const lastNote = notes[0]; // Pega a nota mais recente
    const match = lastNote.match(/([A-Ga-g])(#|b)?(\d)/); //  Garante que a oitava/acidente/pitch seja o mesmo do VexFlow    if (!match) return;

    const [_, pitch, accidental, octave] = match; //Desestrutura os grupos
    const formattedNote = `${pitch.toLowerCase()}/${octave}`; // Formata a recebida no ToneJs nota pro VexFlow

    // Cria StaveNote (Nota na partitura)
    const vexNote = new StaveNote({
      clef: "treble",
      keys: [formattedNote], // Usa a nota formatada corretament
      duration: "q", // Quarter note
    });

    // Adiciona o símbolo de Acidentes
    if (accidental) {
      vexNote.addModifier(new Accidental(accidental), 0); // Acidentes
    }
    // Adiciona rest notes se incompleto
    const totalBeats = 4; //Batidas Totais numa 4/4 
    const currentBeats = 1; // Uma nota por vez por favor
    const missingBeats = totalBeats - currentBeats;

    const vexNotes = [vexNote];
    for (let i = 0; i < missingBeats; i++) {
      vexNotes.push(
        new StaveNote({
          clef: "treble",
          keys: ["b/4"], // Rest note
          duration: "qr", // Quarter rest
        })
      );
    }

    //voz 4/4
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(vexNotes);

    // Formata e justifica notas na partitura
    const formatter = new Formatter().joinVoices([voice]).format([voice], 400);

    // Render na voz
    voice.draw(context, stave);
  } , [notes]); // Garante que o useEffect faça o que deve ser feito. 

  return <div ref={scoreRef}></div>;
};

export default Score;