import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExLinker.scss';

export default function ExLinker({ logo, route, title }) {
  const navigate = useNavigate();

  return (
    <div className="ex-linker-container">
      <button
        className="ex-linker-button"
        onClick={() => navigate(route)}
      >
        <img src={logo} alt="Logo" className="ex-linker-logo" title = "Clique para ir ao exercício" />
      </button>
      <span
        className="ex-linker-title"
        title = "Clique para ir ao exercício"
        onClick={() => navigate(route)}
      >
        {title}
      </span>
    </div>
  );
}