import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Accidental,
} from "vexflow"; // Import required classes directly

const Score = ({ notes }) => {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    console.log("Notes passed to Score:", notes); // Debugging log

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
    const match = lastNote.match(/([A-Ga-g])(#|b)?(\d)/); // Match pitch, accidental, and octave
    if (!match) return;

    const [_, pitch, accidental, octave] = match; // Destructure the matched groups
    const formattedNote = `${pitch.toLowerCase()}/${octave}`; // Format the note for VexFlow

    // Create the StaveNote
    const vexNote = new StaveNote({
      clef: "treble",
      keys: [formattedNote], // Use the correctly formatted note
      duration: "q", // Quarter note duration
    });

    // Add accidental if present
    if (accidental) {
      vexNote.addModifier(new Accidental(accidental), 0); // Correctly add the accidental
    }

    // Add rest notes if the voice is incomplete
    const totalBeats = 4; // Total beats in a 4/4 measure
    const currentBeats = 1; // We are only rendering one note at a time
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

    // Create a voice in 4/4
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(vexNotes);

    // Format and justify the notes to fit the stave
    const formatter = new Formatter().joinVoices([voice]).format([voice], 400);

    // Render the voice
    voice.draw(context, stave);
  }, [notes]); // Ensure useEffect runs when `notes` changes

  return <div ref={scoreRef}></div>;
};

export default Score;