// src/pages/Dashboard.jsx
import React from 'react';
import ModuleCard from '../components/ModuleCard/ModuleCard';
import '../scss/DefaultStyles.scss';
import module1img from '../Assets/moduleImages/module1.jpg';
import module2img from '../Assets/moduleImages/module2.jpg';
import module3img from '../Assets/moduleImages/module3.webp';
import module4img from '../Assets/moduleImages/module4.jpg';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="modules-container">
        {/* Só puxar tagzinha pra importar o componente*/}
        <ModuleCard title="Notas e Acidentes" image={module1img} />
        <ModuleCard title="Intervalos" image={module2img} />
        <ModuleCard title="Escalas" image={module3img} />
        <ModuleCard title="Acordes" image={module4img} />
      </div>
    </div>
  );
};

export default Dashboard;
