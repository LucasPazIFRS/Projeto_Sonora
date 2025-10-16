import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import ScoreComplex from '../../components/ScoreComplex/ScoreComplex'; // Integração com VexFlow
import './GuessIntervalExercise.scss';

const INTERVALS = [
  { name: 'Uníssono', semitones: 0 },
  { name: 'Segunda menor', semitones: 1 },
  { name: 'Segunda maior', semitones: 2 },
  { name: 'Terça menor', semitones: 3 },
  { name: 'Terça maior', semitones: 4 },
  { name: 'Quarta justa', semitones: 5 },
  { name: 'Quarta aumentada', semitones: 6 },
  { name: 'Quinta justa', semitones: 7 },
  { name: 'Sexta menor', semitones: 8 },
  { name: 'Sexta maior', semitones: 9 },
  { name: 'Sétima menor', semitones: 10 },
  { name: 'Sétima maior', semitones: 11 },
  { name: 'Oitava justa', semitones: 12 },
];

const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

const GuessIntervalExercise = () => {
  const [targetInterval, setTargetInterval] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState([]);
  const [mode, setMode] = useState('melodic'); // 'melodic' ou 'harmonic'

  useEffect(() => {
    generateNewInterval();
  }, []);

  const generateNewInterval = async () => {
    const baseNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
    const targetNote = Tone.Frequency(baseNote).transpose(interval.semitones).toNote();

    setTargetInterval(interval);
    setGeneratedNotes([baseNote, targetNote]); // Certifique-se de que ambas as notas estão no array

    const synth = new Tone.Synth().toDestination();
    await Tone.start();

    if (mode === 'melodic') {
      synth.triggerAttackRelease(baseNote, '1n');
      setTimeout(() => synth.triggerAttackRelease(targetNote, '1n'), 500);
    } else {
      synth.triggerAttackRelease([baseNote, targetNote], '1n');
    }
  };

  const handleIntervalClick = (intervalName) => {
    if (intervalName === targetInterval.name) {
      setFeedback('✅ Acertou!');
    } else {
      setFeedback(`❌ Errou! Era ${targetInterval.name}`);
    }
    setTimeout(() => {
      setFeedback('');
      generateNewInterval();
    }, 2000);
  };

  return (
    <div className="guess-interval-exercise">
      <h2>Identifique o Intervalo</h2>
      <div className="score-container">
        {/* Passa as duas notas para o componente Score */}
        <ScoreComplex notes={generatedNotes} />
      </div>
      <div className="interval-options">
        {INTERVALS.map(({ name }) => (
          <button key={name} className="interval-button" onClick={() => handleIntervalClick(name)}>
            {name}
          </button>
        ))}
      </div>
      <div className={`feedback ${feedback ? 'visible' : ''}`}>{feedback}</div>
      <div className="mode-toggle">
        <button onClick={() => setMode('melodic')} className={mode === 'melodic' ? 'active' : ''}>
          Melódico
        </button>
        <button onClick={() => setMode('harmonic')} className={mode === 'harmonic' ? 'active' : ''}>
          Harmônico
        </button>
      </div>
    </div>
  );
};

export default GuessIntervalExercise;