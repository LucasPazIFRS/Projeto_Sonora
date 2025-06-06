// src/components/Header/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { Link } from 'react-router-dom';
export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-buttons">
        <button className="header-button" onClick={() => navigate(-1)}>&lt;</button>
        <button className="header-button" onClick={() => navigate(1)}>&gt;</button>
      </div>
      <div className="header-center">
     
      <Link to="/">
  <h1>𝄞Sonora</h1>
      </Link>
     
      </div>
      <div className="header-right">
        <button className="header-button" onClick={() => navigate('/profile')}>Perfil</button>
        <button className="header-button" onClick={() => navigate('/configs')}>Configs</button>
        <button className="header-button" onClick={() => navigate('/documentation')}>Docs</button>
      </div>
    </header>
  );
}
