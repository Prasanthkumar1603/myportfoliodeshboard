// src/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Messages</Link>
        </li>
        <li>
          <Link to="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</Link>
        </li>
        <li>
          <Link to="/experience" style={{ color: 'white', textDecoration: 'none' }}>Experience</Link>
        </li>
        <li>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Me</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
