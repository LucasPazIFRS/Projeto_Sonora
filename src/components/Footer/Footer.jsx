// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.scss';

export default function Footer({ onChatClick }) {
  return (
    <footer className="footer">
      <div className="footer-button-container">
        <button className="footer-button" onClick={onChatClick}>Chat</button>
      </div>
    </footer>
  );
}
