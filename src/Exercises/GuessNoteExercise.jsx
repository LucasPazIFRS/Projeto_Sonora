// src/components/GuessNoteExercise/GuessNoteExercise.jsx
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import './GuessNoteExercise.scss';

const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

const GuessNoteExercise = () => {
  const [targetNote, setTargetNote] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateNewNote();
  }, []);

  const generateNewNote = async () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    setTargetNote(randomNote);
    const synth = new Tone.Synth().toDestination();
    await Tone.start();
    synth.triggerAttackRelease(randomNote, '1n');
  };

  const handleNoteClick = (note) => {
    if (note === targetNote) {
      setFeedback('✅ Acertou!');
    } else {
      setFeedback(`❌ Errou! Era ${targetNote}`);
    }
    setTimeout(() => {
      setFeedback('');
      generateNewNote();
    }, 2000);
  };

  return (
    <div className="guess-note-exercise">
      <h2>Adivinhe a Nota</h2>
      <div className="piano">
        {NOTES.map((note) => (
          <button
            key={note}
            className="key"
            onClick={() => handleNoteClick(note)}
          >
            {note}
          </button>
        ))}
      </div>
      <div className="feedback">{feedback}</div>
    </div>
  );
};

export default GuessNoteExercise;
