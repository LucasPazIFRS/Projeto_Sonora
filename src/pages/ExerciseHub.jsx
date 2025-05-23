import React from 'react';
import ExLinker from '../components/ExLinker/ExLinker.jsx';
import notesLogo from '../Assets/logos/logo_x1.jpg';
import notes2Logo from '../Assets/logos/logo_x2.jpg';

const ExerciseHub = () => {
  return (
    <div>
      <h2>Exercícios do Módulo</h2>
      
      <ExLinker logo={notesLogo} route="/exercises/notes" title="Notas 1" />
      <ExLinker logo={notes2Logo} route="/exercises/notes2" title="Notas 2" />
    </div>
  );
};

export default ExerciseHub;