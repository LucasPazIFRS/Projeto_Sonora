import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import Score from '../components/Score/Score'; // Import the Score component
import './GuessNoteExercise.scss';

// Only white keys (no accidentals)
const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

const GuessNoteExercise = () => {
  const [targetNote, setTargetNote] = useState('');
  const [feedback, setFeedback] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState([]); // State to store the most recent note

  useEffect(() => {
    generateNewNote(); // Generate the first note on mount
  }, []);

  const generateNewNote = async () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    setTargetNote(randomNote);
    setGeneratedNotes([randomNote]); // Update the generated notes for the Score component
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
      setFeedback(''); // Clear feedback after 2 seconds
      generateNewNote(); // Generate a new note
    }, 2000);
  };

  return (
    <div className="guess-note-exercise">
      <h5>Escute, clique e acerte!</h5>
      <div className="score-container">
        <Score notes={generatedNotes} /> {/* Display the current note on the stave */}
      </div>
      <div className="piano">
        {NOTES.map((note) => (
          <div className="key-container" key={note}>
            <button
              className="key"
              onClick={() => handleNoteClick(note)}
            >
              {note}
            </button>
          </div>
        ))}
      </div>
      <div className={`feedback ${feedback ? 'visible' : ''}`}>{feedback}</div>
    </div>
  );
};

export default GuessNoteExercise;