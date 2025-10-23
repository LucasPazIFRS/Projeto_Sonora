import React from 'react';
import ModuleCard from '../components/ModuleCard/ModuleCard';
import '../scss/DefaultStyles.scss';
import module1img from '../Assets/moduleImages/module1.jpg';
import module2img from '../Assets/moduleImages/module2.jpg';
import module3img from '../Assets/moduleImages/module3.jpg';
import module4img from '../Assets/moduleImages/module4.jpg';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Menu Principal</h2>
      <div className="modules-container">
        <ModuleCard
          title="Notas e Acidentes"
          image={module1img}
          link="/exercise-hub" 
        />
        <ModuleCard
          title="Intervalos"
          image={module2img}
          link="/exercise-hubIntervalos" 
        />
        <ModuleCard
          title="Escalas"
          image={module3img}
          link="/exercise-hubScales" 
        />
        <ModuleCard
          title="Acordes"
          image={module4img}
          link="/exercise-hubChords"
        />
      </div>
    </div>
  );
};

export default Dashboard;