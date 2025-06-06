import React, { useEffect, useState } from "react";
import "./Emitter.scss";

const Emitter = () => {
  const symbols = ["♪", "♫", "𝅘𝅥", "𝄞", "𝄢"];
  const [fallingSymbols, setFallingSymbols] = useState([]);

  useEffect(() => {
    
    const interval = setInterval(() => {
      const newSymbol = {
        id: Date.now(),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 100, // posição horizontal aleatória
        size: Math.random() * 3 + 1, //tamanho aleatório
      };
      setFallingSymbols((prev) => [...prev, newSymbol]);

      // Remover símbolos antigos para evitar sobrecarga
      setFallingSymbols((prev) => prev.filter((item) => Date.now() - item.id < 5000));
    }, 250); // Adiciona um novo símbolo a cada 500ms

    return () => clearInterval(interval);
  }, [symbols]);

  return (
    <div className="emitter">
      {fallingSymbols.map((item) => (
        <span
          key={item.id}
          className="falling-symbol"
          style={{ left: `${item.left}%` ,
          fontSize: `${item.size}rem`,
        
        }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
};

export default Emitter;