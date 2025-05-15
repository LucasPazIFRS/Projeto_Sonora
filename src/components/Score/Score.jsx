import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
} from "vexflow"; // Import required classes directly

const Score = ({ notes }) => {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    // Clear the previous notation
    scoreRef.current.innerHTML = "";

    // Initialize VexFlow
    const renderer = new Renderer(scoreRef.current, Renderer.Backends.SVG);

    // Configure the renderer
    renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#fff");

    // Create the stave
    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Convert the last note to VexFlow format
    const lastNote = notes[0]; // Get the most recent note
    const formattedNote = lastNote
      .replace(/([A-Ga-g])(#|b)?(\d)/, (_, pitch, accidental, octave) => {
        return `${pitch.toLowerCase()}${accidental || ""}/${octave}`;
      });

    const vexNote = new StaveNote({
      clef: "treble",
      keys: [formattedNote], // Use the correctly formatted note
      duration: "q", // Quarter note duration
    });

    // Create a voice in 4/4
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables([vexNote]);

    // Format and justify the note to fit the stave
    const formatter = new Formatter().joinVoices([voice]).format([voice], 400);

    // Render the voice
    voice.draw(context, stave);
  }, [notes]);

  return <div ref={scoreRef}></div>;
};

export default Score;