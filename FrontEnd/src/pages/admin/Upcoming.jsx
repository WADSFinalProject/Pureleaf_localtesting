import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import '../../styles/admin_styles/Upcoming.css';
import Sidebar from './Sidebar';
import SidebarIcon from '../../images/admin/sidebar-button.png';
import searchIcon from '../../images/admin/search-icon.png';
import filterIcon from '../../images/admin/filter-icon.png';

const ShipmentBox = ({ batchId, dryWeight, wetWeight, powderedWeight, shipmentId, status }) => {
  return (
    <div className="shipment-box">
      <div className="shipment-box-header">{batchId}</div>
      <div className="shipment-box-body">
        <div>Dry Weight: {dryWeight || 'N/A'}</div>
        <div>Wet Weight: {wetWeight || 'N/A'}</div>
        <div>Powdered Weight: {powderedWeight || 'N/A'}</div>
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

const RecentActivity = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Shipments',
        data: [60, 90, 40, 80],
        backgroundColor: ['rgba(182, 162, 72, 0.6)', 'rgba(182, 162, 72, 0.6)', 'rgba(182, 162, 72, 0.6)', 'rgba(182, 162, 72, 0.6)'],
        borderWidth: 1,
      },
      {
        label: 'Deliveries',
        data: [50, 70, 60, 90],
        backgroundColor: ['rgba(98, 49, 31, 0.6)', 'rgba(98, 49, 31, 0.6)', 'rgba(98, 49, 31, 0.6)', 'rgba(98, 49, 31, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="activity-content">
        <div className="graph-section">
          <div className="activity-graph">
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="selection-section">
          <div className="time-period">
            <h3>Shipments</h3>
            <div className="time-option">
              <span className='bold-text'>Weekly</span>
              <div className="time-buttons">
                <span className="">Previous week</span>
                <span className="">Next week</span>
              </div>
            </div>
            <div className="time-option">
              <span className="bold-text">Monthly</span>
              <div className="time-buttons">
                <span className="">Previous month</span>
                <span className="">Next month</span>
              </div>
            </div>
            <div className="time-option">
              <span className="bold-text">Yearly</span>
              <div className="time-buttons">
                <span className="">Previous year</span>
                <span className="">Next year</span>
              </div>
            </div>
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
      <button onClick={toggleSidebar} className="sidebar-button">
        <img src={SidebarIcon} alt="Sidebar" />
      </button>
      <div className="header-left">
        <h1>Upcoming</h1>
        <p>Upcoming Shipment of {currentDate}</p>
      </div>
      <div className="header-right">
        <form onSubmit={handleSearchSubmit}>
          <div className={`search-box ${isSearchActive ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Search here.."
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
            />
            <button type="submit" onClick={handleSearchClick}>
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </form>
        <button className='filter-icon'>
          <img src={filterIcon} alt="Filter" />
          Filter
        </button>
      </div>
    </div>
  );
};

const Upcoming = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [batches, setBatches] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8001/batches/');
        const filteredBatches = response.data.filter(batch => batch.status === 1 || batch.status === 4 || batch.status === 5);
        setBatches(filteredBatches);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} navigateTo={() => {}} />
      <div className={`left-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header username="Insert Name" toggleSidebar={toggleSidebar} />
        <div className="shipments">
          <h2>Shipments</h2>
          <div className="shipment-boxes">
            {batches.map(batch => (
              <ShipmentBox
                key={batch.batch_ID}
                batchId={batch.batch_ID}
                dryWeight={batch.dry_leaves?.dry_weight}
                wetWeight={batch.wet_leaves?.wet_weight}
                powderedWeight={batch.powdered_leaves?.powdered_weight}
                shipmentId={batch.batch_ID}
                status={batch.status}
              />
            ))}
          </div>
        </div>
        <div className="recent-activity-container">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
