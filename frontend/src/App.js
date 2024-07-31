// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import SentimentAnalysis from './components/SentimentAnalysis';
import ResultPage from './pages/Result';
import ProtectedRoutes from './components/ProtectedRoutes';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sentiment-analysis" element={<ProtectedRoutes><SentimentAnalysis /></ProtectedRoutes>} />
          <Route path="/result/:index" element={<ProtectedRoutes><ResultPage /></ProtectedRoutes>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
