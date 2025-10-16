import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import QuickMenu from './components/QuickMenu/QuickMenu';
import Emitter from './components/Emitter/Emitter';
import AgentFloat from './components/AgentFloat/AgentFloat';
import './App.scss';

import Dashboard from './pages/Dashboard';
import Configs from './pages/Configs';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import Login from './pages/Login';
import ExerciseHub from './pages/ExerciseHub';
import NotesExercise from './pages/exercises/Notes';
import Notes2 from './pages/exercises/Notes2';
import GuessNoteExercise from './Exercises/GuessNoteExercise';
import GuessNoteExerciseAdv from './Exercises/GuessNoteExerciseAdv';
import Intervals from './pages/exercises/Intervals';

import NyanCatImage from './Assets/fotodogato.jpg'; 

function App() {
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const location = useLocation(); // Hook para obter a rota atual

  const handleOpenBoard = () => {
    setIsBoardOpen(true);
  };

  const handleCloseBoard = () => {
    setIsBoardOpen(false);
  };

  // Verifica se a rota atual é "/login"
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {!isLoginPage && <Emitter />}
      {!isLoginPage && <Header />}
      {!isLoginPage && <QuickMenu />}

      <div className="main-content">
{/*
      <AgentFloat imageSrc={NyanCatImage} />
*/ }
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/configs" element={<Configs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/exercise-hub" element={<ExerciseHub />} />
          <Route path="/exercises/notes" element={<NotesExercise />} />
          <Route path="/exercises/intervals" element={<Intervals />} />
          <Route path="/exercises/guess-note" element={<GuessNoteExercise />} />
          <Route path="/exercises/notes2" element={<Notes2 />} />
        </Routes>
      </div>

      {!isLoginPage && (
        <Footer onChatClick={handleOpenBoard} />
      )}

      <Board isVisible={isBoardOpen} onClose={handleCloseBoard}>
        <h2>Chat</h2>
        <p>Plataforma Sonora, desenvolvida por Lucas Martins |IFRS|DS4|2025|</p>
      </Board>
    </div>
  );
}

export default App;