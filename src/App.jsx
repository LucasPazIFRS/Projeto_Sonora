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
import NotesExercise from './pages/exercises/Notes';
import Notes2 from './pages/exercises/Notes2';
import GuessNoteExercise from './Exercises/GuessNoteExercise';
import GuessNoteExerciseAdv from './Exercises/GuessNoteExerciseAdv';

function App() {
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
            <Route path="/login" element={<Login />} />
            <Route path="/configs" element={<Configs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/exercise-hub" element={<ExerciseHub />} />
            <Route path="/exercises/notes" element={<NotesExercise />} />
            <Route path="/exercises/guess-note" element={<GuessNoteExercise />} />
            <Route path="/exercises/notes2" element={<Notes2 />} />
          </Routes>
        </div>

        <Footer onChatClick={handleOpenBoard} />

        <Board isVisible={isBoardOpen} onClose={handleCloseBoard}>
          <h2>Chat</h2>
          <p>Bem-vindo ao chat, este que em breve terá interação com os mascotes:)</p>
        </Board>
      </div>
    </Router>
  );
}

export default App;