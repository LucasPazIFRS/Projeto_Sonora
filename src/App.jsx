// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import QuickMenu from './components/QuickMenu/QuickMenu';
import ModuleCard from './components/ModuleCard/ModuleCard';
import './App.scss';

import Dashboard from './pages/Dashboard';
import Configs from './pages/Configs';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import Login from './pages/Login';
import ExerciseHub from './pages/ExerciseHub';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <QuickMenu />
        
        {/* Conteúdo Principal */}
        <div className="main-content">
        
        
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/configs" element={<Configs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/login" element={<Login />} />
           <Route path="/exercise-hub" element={<ExerciseHub />} />
          </Routes>
       
        
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
