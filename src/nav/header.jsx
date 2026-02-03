// src/nav/header.jsx
import React from 'react';

const Header = ({ setSidebarOpen }) => {
  const logout = () => {
    localStorage.removeItem('auth');
    window.location.reload();
  };

  return (
    <header className="header">

      {/* Left side */}
      <div className="header-left">
        {/* Mobile menu button */}
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Center */}
      <div className="header-content">
        <h1>
          Welcome, <span className="highlight-name">PK</span>
        </h1>
        <div className="header-icons">
          <span>🔔 Notifications</span>
          <span>👤 Profile</span>
        </div>
      </div>

      {/* Right */}
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;
