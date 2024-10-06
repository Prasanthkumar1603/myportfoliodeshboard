// src/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Welcome,  PK</h1>
        <div className="header-icons">
          <span>🔔 Notifications</span>
          <span>👤 Profile</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
