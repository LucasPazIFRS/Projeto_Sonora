// src/pages/ExerciseHubPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseHub = () => {
  return (
    <div>
      <h2>Exercícios do Módulo</h2>
      <ul>
        <li>
          <Link to="/exercises/Notes">Notas 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default ExerciseHub;
