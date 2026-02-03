import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">Dashboard</h2>

        <ul className="sidebar-menu">
          <li>
            <Link to="/" onClick={closeSidebar}>Messages</Link>
          </li>
          <li>
            <Link to="/projects" onClick={closeSidebar}>Projects</Link>
          </li>
          <li>
            <Link to="/experience" onClick={closeSidebar}>Experience</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeSidebar}>About Me</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
