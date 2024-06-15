import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin_styles/History.css'; 
import Sidebar from './Sidebar';
import SidebarIcon from '../../images/admin/sidebar-button.png';
import searchIcon from '../../images/admin/search-icon.png'; 
import filterIcon from '../../images/admin/filter-icon.png'; 
import notificationIcon from '../../images/admin/notification-icon.png'; 
import RecentActivity from './RecentActivity';

const HistoryBox = ({ batchId, dryWeight, wetWeight, powderedWeight, shipmentId, status, dateReceived }) => {
  return (
    <div className="history-box">
      <div className="history-box-header">{batchId}</div>
      <div className="history-box-body">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Dry Weight: {dryWeight || 'N/A'}</div>
          <div>Wet Weight: {wetWeight || 'N/A'}</div>
          <div>Powdered Weight: {powderedWeight || 'N/A'}</div>
          <div className="date-received">Date received: {dateReceived}</div>
        </div>
        <div>Batch ID: {shipmentId}</div>
        <div className="status-container">
          <span className="status-text">Status: </span>
          <div className="progress-bar">
            <div className={`progress-bar-circle ${status >= 1 ? 'active' : ''}`}></div>
            <div className="progress-bar-line"></div>
            <div className={`progress-bar-circle ${status >= 2 ? 'active' : ''}`}></div>
            <div className="progress-bar-line"></div>
            <div className={`progress-bar-circle ${status >= 3 ? 'active' : ''}`}></div>
            <div className="progress-bar-line"></div>
            <div className={`progress-bar-circle ${status >= 4 ? 'active' : ''}`}></div>
            <div className="progress-bar-line"></div>
            <div className={`progress-bar-circle ${status >= 5 ? 'active' : ''}`}></div>
            <div className="progress-bar-line"></div>
            <div className={`progress-bar-circle ${status >= 6 ? 'active' : ''}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ username, toggleSidebar }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchBlur = () => {
    setIsSearchActive(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="sidebar-button">
          <img src={SidebarIcon} alt="Sidebar" />
        </button>
        <h1>Ongoing</h1>
        <p>Current Ongoing Shipment of {currentDate}</p>
      </div>
      <div className="header-right">
        <form onSubmit={handleSearchSubmit}>
          <div className={`search-box ${isSearchActive ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
            />
            <button type="submit" onClick={handleSearchClick}>
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </form>
        <button className='notification-icon'>
          <img src={notificationIcon} alt="Filter" />
        </button>
      </div>
    </div>
  );
};

const Ongoing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [batches, setBatches] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8001/batches/');
        const filteredBatches = response.data.filter(batch => batch.status === 2);
        setBatches(filteredBatches);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  return (
    <div className="history-container">
      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} navigateTo={() => {}} />
      <div className={`left-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header username="Insert Name" toggleSidebar={toggleSidebar} />
        <h2 className='shipment-writing'>Shipments</h2>
        <div className="order-history">
          <button className="filter-button">
            <img src={filterIcon} alt="Filter" />
            Filter
          </button>
          <div className="history-boxes">
            {batches.map(batch => (
              <HistoryBox
                key={batch.batch_ID}
                batchId={batch.batch_ID}
                dryWeight={batch.dry_leaves?.dry_weight}
                wetWeight={batch.wet_leaves?.wet_weight}
                powderedWeight={batch.powdered_leaves?.powdered_weight}
                shipmentId={batch.batch_ID}
                status={batch.status}
                dateReceived={batch.batch_date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
