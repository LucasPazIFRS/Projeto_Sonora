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
        <ModuleCard
          title="Notas e Acidentes"
          image={module1img}
          link="/exercise-hub" // Pass the link prop
        />
        <ModuleCard
          title="Intervalos"
          image={module2img}
          link="/exercise-hub" // Pass the link prop
        />
        <ModuleCard
          title="Escalas"
          image={module3img}
          link="/exercise-hub" // Pass the link prop
        />
        <ModuleCard
          title="Acordes"
          image={module4img}
          link="/exercise-hub" // Pass the link prop
        />
      </div>
    </div>
  );
};

export default Dashboard;