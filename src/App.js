// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './page/AdminDashbord';
import ProjectComponent from './page/ProjectComponent';
import ExperienceComponent from './page/ExperienceComponen';
import Sidebar from './nav/sidebar';
import Header from './nav/header';
import './App.css';  // Include CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="dashboard-content">
            <Routes>
              {/* Default route for Admin Dashboard */} 
              <Route path="/" element={<AdminDashboard />} />

              {/* Route for managing projects */}
              <Route path="/projects" element={<ProjectComponent />} />

              {/* Route for managing experiences */}
              <Route path="/experience" element={<ExperienceComponent />} />

              {/* You can add more routes here as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
