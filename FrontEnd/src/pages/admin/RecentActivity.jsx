import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../styles/admin_styles/RecentActivity.css'; // Ensure this path is correct

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecentActivity = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Shipments',
        data: [60, 90, 40, 80, 50, 70, 60],
        backgroundColor: '#314628',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recent Shipments Activity',
      },
    },
  };

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="activity-content">
        <div className="graph-section">
          <Bar data={data} options={options} />
        </div>
        <div className="selection-section">
          <div className="time-period">
            <h3 className="bold-text">Shipments</h3>
            <div className="time-option">
              <span className="bold-text">Weekly</span>
              <div className="time-buttons">
                <span>Previous week</span>
                <span>Next week</span>
              </div>
            </div>
            <div className="time-option">
              <span className="bold-text">Monthly</span>
              <div className="time-buttons">
                <span>Previous month</span>
                <span>Next month</span>
              </div>
            </div>
            <div className="time-option">
              <span className="bold-text">Yearly</span>
              <div className="time-buttons">
                <span>Previous year</span>
                <span>Next year</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
