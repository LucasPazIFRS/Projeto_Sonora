// src/components/QuickMenu/QuickMenu.jsx
import React, { useState } from 'react';
import './QuickMenu.scss';

export default function QuickMenu() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => setIsVisible(!isVisible);

  return (
    <div className="quick-menu-container">
      <button onClick={toggleMenu} className="quick-menu-toggle">
        {isVisible ? 'Fechar Menu' : 'Abrir Menu'}
      </button>

      {isVisible && (
        <div className="quick-menu">
          <button className="quick-menu-button">Configurações</button>
          <button className="quick-menu-button">Perfil</button>
          <button className="quick-menu-button">Ajuda</button>
        </div>
      )}
    </div>
  );
}
