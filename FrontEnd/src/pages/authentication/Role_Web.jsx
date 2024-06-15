// Role_Web.jsx

import React from 'react';
import './styles/style.css';
import { Link } from 'react-router-dom';

const Role = () => {
  return (
    <div className="flex-container">
      <div className="image-container"></div>
      <div className="main-content">
        <h1 className="role-title">ROLE</h1>
        <p className="desc-role">What is your position in this company?</p>

        <p className="position-label">POSITION</p>
        <select className="position_text-field" defaultValue="">
          <option value="" disabled>Select your role</option>
          <option value="role1">Admin</option>
          <option value="role2">Centra</option>
          <option value="role3">Harbour</option>
          <option value="role3">XYZ</option>
        </select>

        <button className="enter-button">Enter</button>
      </div>
    </div>
  );
};

export default Role;