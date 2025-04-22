// src/pages/Dashboard.jsx
import React from 'react';
import ModuleCard from '../components/ModuleCard/ModuleCard';
import '../scss/DefaultStyles.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="modules-container">
        {/* Exemplo de como adicionar vários módulos */}
        <ModuleCard title="Notas" imageUrl="module1.jpg" />
        <ModuleCard title="Intervalos" imageUrl="module2.jpg" />
        <ModuleCard title="Escalas" imageUrl="module3.jpg" />
        <ModuleCard title="Acordes" imageUrl="module4.jpg" />
      </div>
    </div>
  );
};

export default Dashboard;
