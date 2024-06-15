import React, { useState } from 'react';
import notificationIcon from '../images/notification-icon.png'; 
import moreButtonIcon from '../images/more-button.png'; 

const Calendar = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const tasks = [
    { date: 'May 20, 2024', time: '10:00', title: 'Title', description: 'Project Task' },
    { date: 'May 20, 2024', time: '13:30', title: 'Title', description: 'Project Task' },
    { date: 'May 21, 2024', time: '08:00', title: 'Title', description: 'Project Task' },
    { date: 'May 21, 2024', time: '14:45', title: 'Title', description: 'Project Task' },
    { date: 'May 22, 2024', time: '06:00', title: 'Title', description: 'Project Task' },
    { date: 'May 22, 2024', time: '12:15', title: 'Title', description: 'Project Task' },
  ];

  const handleEdit = (task) => {
    setSelectedTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setSelectedTask({ ...selectedTask, title: taskTitle, description: taskDescription });
    setIsModalOpen(false);
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
        <div key={index} className="calendar-date">
          <h3>{task.date}</h3>
          <div className="deadline-container">
            <div className="deadline">
              <div className="time">{task.time}</div>
              <div className="line"></div>
              <div className="info">
                <div className="title">{task.title}</div>
                <div className="task">{task.description}</div>
                <button onClick={() => handleEdit(task)} className="more-button">
                  <img src={moreButtonIcon} alt="Edit" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <label>
              Title:
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </label>
            <label>
              Description:
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
