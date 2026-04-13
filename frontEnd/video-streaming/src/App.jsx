import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VideoDetails from './pages/VideoDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';

function App() {
  const isAuthenticated = !!localStorage.getItem('loggedUser');

  return (
      <Router>
        <div className="bg-black min-h-screen text-white">
          {isAuthenticated && <Navbar />}

          <div className={isAuthenticated ? "pt-16" : ""}>
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected */}
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />

              {/* CHANGED THIS TO /watch/:id TO MATCH YOUR CARDS */}
              /* Inside your Routes in App.jsx */
              <Route path="/watch/:id" element={
                <ProtectedRoute>
                  <VideoDetails />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* If no route matches, go Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;