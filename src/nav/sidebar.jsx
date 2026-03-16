import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">PK Portfolio</h2>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" onClick={closeSidebar}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/projects" onClick={closeSidebar}>Projects</NavLink>
          </li>
          <li>
            <NavLink to="/experience" onClick={closeSidebar}>Experience</NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeSidebar}>About Me</NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;