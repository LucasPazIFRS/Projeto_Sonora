import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import './GuessNoteExerciseAdv.scss';

// Define the notes in the desired order
const NOTES = [
  { note: 'C4', type: 'white' },
  { note: 'C#4', type: 'black' },
  { note: 'D4', type: 'white' },
  { note: 'D#4', type: 'black' },
  { note: 'E4', type: 'white' },
  { note: 'F4', type: 'white' },
  { note: 'F#4', type: 'black' },
  { note: 'G4', type: 'white' },
  { note: 'G#4', type: 'black' },
  { note: 'A4', type: 'white' },
  { note: 'A#4', type: 'black' },
  { note: 'B4', type: 'white' }
];

const GuessNoteExerciseAdv = () => {
  const [targetNote, setTargetNote] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateNewNote();
  }, []);

  const generateNewNote = async () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)].note;
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
  <h2>Escute, clique e acerte!</h2>
  <div className="piano">
    {NOTES.map(({ note, type }) => (
      <button
        key={note}
        className={`key ${type === 'black' ? 'black-key' : 'white-key'}`}
        onClick={() => handleNoteClick(note)}
      >
        {note}
      </button>
    ))}
  </div>
  <div className={`feedback ${feedback ? 'visible' : ''}`}>{feedback}</div>
</div>

  );
};

export default GuessNoteExerciseAdv;