import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseHub = () => {
  return (
    <div>
      <h2>Exercícios do Módulo</h2>
      <ul>
        <li>
          <Link to="/exercises/notes">Exercício Notas 1</Link>
          <br />
          <Link to="/exercises/notes2">Exercício Notas 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default ExerciseHub;