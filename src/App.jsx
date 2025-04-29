// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from './components/Board/Board';
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
  // ⬇️ Agora o useState está dentro do componente App ✅
  const [isBoardOpen, setIsBoardOpen] = useState(false);

  const handleOpenBoard = () => {
    setIsBoardOpen(true);
  };

  const handleCloseBoard = () => {
    setIsBoardOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <QuickMenu />

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

        <Footer onChatClick={handleOpenBoard} />

        <Board isVisible={isBoardOpen} onClose={handleCloseBoard}>
          <h2>Chat</h2>
          <p>Bem-vindo ao chat! Em breve isso será funcional :)</p>
        </Board>
      </div>
    </Router>
  );
}

export default App;
