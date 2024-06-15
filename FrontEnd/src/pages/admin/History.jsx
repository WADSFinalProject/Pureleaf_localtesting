import React, { useState } from 'react';
import '../../styles/admin_styles/History.css'; 
import Sidebar from './Sidebar';
import SidebarIcon from '../../images/admin/sidebar-button.png'; 
import searchIcon from '../../images/admin/search-icon.png'; 
import filterIcon from '../../images/admin/filter-icon.png'; 
import notificationIcon from '../../images/admin/notification-icon.png'; 
import RecentActivity from './RecentActivity';

const HistoryBox = ({ batchId, weight, shipmentId, status, dateReceived }) => {
  return (
    <div className="history-box">
      <div className="history-box-header">{batchId}</div>
      <div className="history-box-body">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Weight: {weight}</div>
          <div className="date-received">Date received: {dateReceived}</div>
        </div>
        <div>Shipment ID: {shipmentId}</div>
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
        <h1>History</h1>
        <p>Orders previously made stored here just for you!</p>
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

const History = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="history-container">
      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} navigateTo={() => {}} />
      <div className={`left-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header username="Insert Name" toggleSidebar={toggleSidebar} />
        <div className="order-history">
          <button className="filter-button">
            <img src={filterIcon} alt="Filter" />
            Filter
          </button>
          <div className="history-boxes">
            <HistoryBox batchId="Batch ID" weight="20kg" shipmentId="12345" status={2} dateReceived="01/01/2024" />
            <HistoryBox batchId="Batch ID" weight="25kg" shipmentId="67890" status={3} dateReceived="02/01/2024" />
            <HistoryBox batchId="Batch ID" weight="30kg" shipmentId="54321" status={4} dateReceived="03/01/2024" />
            <HistoryBox batchId="Batch ID" weight="20kg" shipmentId="12345" status={2} dateReceived="01/01/2024" />
            <HistoryBox batchId="Batch ID" weight="25kg" shipmentId="67890" status={3} dateReceived="02/01/2024" />
            <HistoryBox batchId="Batch ID" weight="30kg" shipmentId="54321" status={4} dateReceived="03/01/2024" />
            <HistoryBox batchId="Batch ID" weight="20kg" shipmentId="12345" status={2} dateReceived="01/01/2024" />
            <HistoryBox batchId="Batch ID" weight="25kg" shipmentId="67890" status={3} dateReceived="02/01/2024" />
            <HistoryBox batchId="Batch ID" weight="30kg" shipmentId="54321" status={4} dateReceived="03/01/2024" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;