import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/admin_styles/Dashboard.css';
import Sidebar from './Sidebar';
import SidebarIcon from '../../images/admin/sidebar-button.png'; 
import searchIcon from '../../images/admin/search-icon.png'; 
import filterIcon from '../../images/admin/filter-icon.png'; 
import notificationIcon from '../../images/admin/notification-icon.png'; 
import moreButtonIcon from '../../images/admin/more-button.png'; 
import RecentActivity from '../admin/RecentActivity';

const ShipmentBox = ({ batchId, dryWeight, wetWeight, powderedWeight, shipmentId, status }) => {
  return (
    <div className="shipment-box">
      <div className="shipment-box-header bold-text">{batchId}</div>
      <div className="shipment-box-body">
        <div className="bold-text">Dry Weight:</div> {dryWeight || 'N/A'}
        <div className="bold-text">Wet Weight:</div> {wetWeight || 'N/A'}
        <div className="bold-text">Powdered Weight:</div> {powderedWeight || 'N/A'}
        <div className="bold-text">Batch ID:</div> {shipmentId}
        <div className="status-container">
          <span className="status-text bold-text">Status: </span>
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
        <h1>
          Hello, <span>{username}</span>
        </h1>
        <button onClick={toggleSidebar} className="sidebar-button">
          <img src={SidebarIcon} alt="Sidebar" />
        </button>
        <p>Today is {currentDate}</p>
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
        <button className='button-filter'> 
          <img src={filterIcon} alt="Filter" />
          Filter
        </button>
      </div>
    </div>
  );
};

const Calendar = ({ tasks, onEdit }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>Calendar</h2>
        <button className="notification-button">
          <img src={notificationIcon} alt="Notifications" />
        </button>
      </div>
      {tasks.map((task, index) => (
        <div key={index} className="calendar-task">
          <div className="date-time">
            <div className="date">{formatDate(task.date)}</div>
            <div className="time">{task.time}</div>
          </div>
          <div className="line"></div>
          <div className="info">
            <div className="title">{task.title}</div>
            <div className="description">{task.description}</div>
          </div>
          <button className="more-button" onClick={() => onEdit(index)}>
            <img src={moreButtonIcon} alt="More" />
          </button>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { time: '10:00', title: 'Title', description: 'Project task', date: 'May 20, 2024' },
    { time: '13:30', title: 'Title', description: 'Project task', date: 'May 21, 2024' },
    { time: '08:00', title: 'Title', description: 'Project task', date: 'May 22, 2024' },
    { time: '16:45', title: 'Title', description: 'Project task', date: 'May 24, 2024' },
    { time: '06:00', title: 'Title', description: 'Project task', date: 'May 26, 2024' },
    { time: '12:15', title: 'Title', description: 'Project task', date: 'May 29, 2024' },
  ]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [batches, setBatches] = useState([]);
  const [username, setUsername] = useState('Insert Name'); // Default username

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8001/batches/');
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    const fetchUser = async () => {
      const userId = Cookies.get('user_id'); // Get the user ID from cookies
      if (!userId) {
        console.error('User ID not found in cookies');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/user/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchBatches();
    fetchUser();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEdit = (index) => {
    setSelectedTask({ ...tasks[index], index });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedTasks = [...tasks];
    updatedTasks[selectedTask.index] = {
      time: selectedTask.time,
      title: selectedTask.title,
      description: selectedTask.description,
      date: selectedTask.date,
    };
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} navigateTo={() => {}} />
      <div className={`left-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header username={username} toggleSidebar={toggleSidebar} />
        <div className="shipments">
          <h2>Shipments</h2>
          <div className="shipment-boxes">
            {batches.filter(batch => batch.status !== 3 && batch.status !== 6).map(batch => (
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
        <RecentActivity />
        <div className="order-history">
          <h2>Order History</h2>
          <div className="history-boxes">
            {batches.filter(batch => batch.status === 3 || batch.status === 6).map(batch => (
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
      <div className="right-container">
        <Calendar tasks={tasks} onEdit={handleEdit} />
      </div>
      {selectedTask && (
        <div className="edit-modal">
          <h2>Edit Task</h2>
          <label>
            Time:
            <input type="time" name="time" value={selectedTask.time} onChange={handleChange} />
          </label>
          <label>
            Title:
            <input type="text" name="title" value={selectedTask.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={selectedTask.description} onChange={handleChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={selectedTask.date} onChange={handleChange} />
          </label>
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={() => setSelectedTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
