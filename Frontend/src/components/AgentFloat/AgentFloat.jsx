import React from "react";
import "./AgentFloat.scss";

const AgentFloat = ({ imageSrc, altText }) => {
  return (
    <div className="agent-float">
      
      <img src={imageSrc} alt={altText} className="floating-image" />
    </div>
  );
};

export default AgentFloat;