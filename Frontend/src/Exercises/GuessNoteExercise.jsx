import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import Score from '../components/Score/Score'; // Importa o componente Score
import './GuessNoteExercise.scss';

// Só notas brancas para o exercício simples
const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

const GuessNoteExercise = () => {
  const [targetNote, setTargetNote] = useState('');
  const [feedback, setFeedback] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState([]); // Estado para guardar as notas geradas recentemente
  useEffect(() => {
    generateNewNote(); // Gera a primeira nota ao montar o componente
  }, []);

  const generateNewNote = async () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    setTargetNote(randomNote);
    setGeneratedNotes([randomNote]); // Atualiza o estado com a nova nota gerada
    // Inicia o sintetizador e toca a nota
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
      setFeedback(''); // Limpa o feedback após 2 segundos
      generateNewNote(); // Gera nota nova
    }, 2000);
  };

  return (
    <div className="guess-note-exercise">
      <h5>Escute, clique e acerte!</h5>
      <div className="score-container">
        <Score notes={generatedNotes} /> {/* Mostra a nota atual na partitura */}
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