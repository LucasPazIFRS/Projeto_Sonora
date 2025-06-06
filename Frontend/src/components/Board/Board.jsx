import React from 'react';
import './Board.scss';

function Board({ children, isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="board-overlay" onClick={onClose}>
      <div className="board-content" onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <button className="board-close" onClick={onClose}>
            ✖
          </button>
        )}
        <div className="board-body">{children}</div>
      </div>
    </div>
  );
}

export default Board;
