// src/components/ModuleCard/ModuleCard.jsx
import React from 'react';
import './ModuleCard.scss';
import { Link } from 'react-router-dom'; // para linkar com a página do módulo

export default function ModuleCard({ title, image, link }) {
  return (
    <div className="module-card">
      <div className="card">
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
        <div className="card-text">
          <h3>{title}</h3>
          <Link to={link} className="card-link">
            Ir para o Módulo
          </Link>
        </div>
      </div>
    </div>
  );
}
