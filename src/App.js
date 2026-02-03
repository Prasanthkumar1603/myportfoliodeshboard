// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminDashboard from './page/AdminDashbord';
// import ProjectComponent from './page/ProjectComponent';
// import ExperienceComponent from './page/ExperienceComponen';
// import Sidebar from './nav/sidebar';
// import Header from './nav/header';
// import './App.css';

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <Router>
//       <div className="app-container">
        
//         {/* Sidebar */}
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {/* Main Content */}
//         <div className="main-content">
//           <Header setSidebarOpen={setSidebarOpen} />

//           <div className="dashboard-content">
//             <Routes>
//               <Route path="/" element={<AdminDashboard />} />
//               <Route path="/projects" element={<ProjectComponent />} />
//               <Route path="/experience" element={<ExperienceComponent />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from './page/AdminDashbord';
import ProjectComponent from './page/ProjectComponent';
import ExperienceComponent from './page/ExperienceComponen';
import Sidebar from './nav/sidebar';
import Header from './nav/header';
import Login from './auth/loginPage';
import './App.css';
import PortfolioPage from './page/portfolioPage';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 🔥 NEW

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
      setIsAuth(true);
    }
  }, []);

  // If not logged in → Login page
  if (!isAuth) {
    return <Login setIsAuth={setIsAuth} />;
  }

  return (
    <Router>
      <div className="app-container">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="main-content">
          <Header setSidebarOpen={setSidebarOpen} />

          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/projects" element={<ProjectComponent />} />
            <Route path="/experience" element={<ExperienceComponent />} />
            <Route path="/about" element={<PortfolioPage />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
