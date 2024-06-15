import React, { useState, useEffect } from 'react';
import SidebarIcon from '../../images/admin/sidebar-button.png';
import FlippedSidebarIcon from '../../images/admin/flipped-sidebar-button.png';
import DashboardLogo from '../../images/admin/dashboard-logo.png';
import ShipmentLogo from '../../images/admin/shipment-logo.png';
import HistoryLogo from '../../images/admin/history-logo.png';
import UpcomingLogo from '../../images/admin/upcoming-logo.png';
import OngoingLogo from '../../images/admin/ongoing-logo.png';
import CompanyLogo from '../../images/admin/another-logo-sidebar.png';
import ProfilePic from '../../images/admin/profile-pic.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/admin_styles/Sidebar.css';

function Sidebar({ isOpen, toggleMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname.substr(1));
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = Cookies.get('user_id'); // Get the user ID from cookies
      if (!userId) {
        console.error('User ID not found in cookies');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/user/${userId}`);
        console.log('User data:', response.data); // Log the response data
        setUserData(response.data); // Store user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (page) => {
    toggleMenu();
    setActiveItem(page);
    navigate(`/${page}`);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        {isOpen ? (
          <button className="close-button" onClick={toggleMenu}>
            <img src={FlippedSidebarIcon} alt="Close" />
          </button>
        ) : (
          <button className="open-button" onClick={toggleMenu}>
            <img src={SidebarIcon} alt="Open" />
          </button>
        )}
        <div className="company-logo">
          <img src={CompanyLogo} alt="Company Logo" />
        </div>
        {userData && (
          <div className="profile-section">
            <img src={ProfilePic} alt="Profile" className="profile-pic" />
            <h2>{userData.username || userData.name}</h2> 
            <p>{userData.email}</p> 
          </div>
        )}
        <div className={`sidebar-item ${activeItem === '' ? 'active' : ''}`} onClick={() => handleNavigation('')}>
          <div className="sidebar-item-content">
            <img src={DashboardLogo} alt="Dashboard" className="dashboard-logo sidebar-logo" />
            <span className="sidebar-text">Dashboard</span>
          </div>
        </div>
        <div className="sidebar-item">
          <div className="sidebar-item-content">
            <img src={ShipmentLogo} alt="Shipment" className="shipment-logo sidebar-logo" />
            <span className="sidebar-text">Shipment</span>
          </div>
          {isOpen && (
            <div className="submenu">
              <div className={`submenu-item ${activeItem === 'upcoming' ? 'active' : ''}`} onClick={() => handleNavigation('upcoming')}>
                <img src={UpcomingLogo} alt="Upcoming" className="upcoming-logo sidebar-logo" />
                <span className="sidebar-text">Upcoming</span>
              </div>
              <div className={`submenu-item ${activeItem === 'ongoing' ? 'active' : ''}`} onClick={() => handleNavigation('ongoing')}>
                <img src={OngoingLogo} alt="Ongoing" className="ongoing-logo sidebar-logo" />
                <span className="sidebar-text">Ongoing</span>
              </div>
            </div>
          )}
        </div>
        <div className={`sidebar-item ${activeItem === 'history' ? 'active' : ''}`} onClick={() => handleNavigation('history')}>
          <div className="sidebar-item-content">
            <img src={HistoryLogo} alt="Order History" className="history-logo sidebar-logo" />
            <span className="sidebar-text">Order History</span>
          </div>
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
    </div>
  );
}

export default Sidebar;
