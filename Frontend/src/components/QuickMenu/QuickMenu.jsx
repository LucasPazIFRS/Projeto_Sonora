// src/components/QuickMenu/QuickMenu.jsx
import React, { useState } from 'react';
import './QuickMenu.scss';

export default function QuickMenu() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => setIsVisible(!isVisible);

  return (
    <div className="quick-menu-container">
      <button onClick={toggleMenu} className="quick-menu-toggle">
        {isVisible ? 'X' : 'Abrir Menu'}
      </button>

      {isVisible && (
        <div className="quick-menu">
          <button className="quick-menu-button">Função 1</button>
          <button className="quick-menu-button">Função 2</button>
          <button className="quick-menu-button">Função 3</button>
        </div>
      )}
    </div>
  );
}
