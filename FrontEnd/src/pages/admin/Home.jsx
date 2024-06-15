import React, { useState } from 'react';
import '../styles/Home.css';
import SidebarIcon from '../images/sidebar-button.png';
import RotatedSidebarIcon from '../images/flipped-sidebar-button.png';
import Sidebar from './Sidebar'; 

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isButtonRotated, setIsButtonRotated] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsButtonRotated(!isButtonRotated);
  };

  const navigateTo = (page) => {
    console.log(`Navigate to ${page}`);
  };

  return (
    <div className="bg">
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className="sidebar-button">
          <img src={isButtonRotated ? RotatedSidebarIcon : SidebarIcon} alt="Unlock" />
        </button>
      )}
      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} navigateTo={navigateTo} />
    </div>
  );
};

export default Home;
