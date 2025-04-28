// src/components/Header/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-buttons">
        <button onClick={() => navigate(-1)}>&lt;</button>
        <button onClick={() => navigate(1)}>&gt;</button>
      </div>
      <div className="header-center">
      <button onClick={() => navigate('/')}>
        <h1>𝄞Sonora</h1>
        </button>
      </div>
      <div className="header-right">
        <button onClick={() => navigate('/profile')}>Perfil</button>
        <button onClick={() => navigate('/configs')}>Configs</button>
        <button onClick={() => navigate('/documentation')}>Docs</button>
      </div>
    </header>
  );
}
