import React, { useState } from 'react';
import '../../styles/authentication_styles/style.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Role = () => {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await axios.post('http://localhost:8000/register', {
        ...user,
        user_type: role,
      });
      // Handle successful registration, e.g., redirect to login page
      console.log('User registered:', response.data);

      // Clear local storage and redirect to login page
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex-container">
      <div className="image-container"></div>
      <div className="main-content">
        <h1 className="role-title">ROLE</h1>
        <p className="desc-role">What is your position in this company?</p>

        <form onSubmit={handleSubmit}>
          <p className="position-label">POSITION</p>
          <select
            className="position_text-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Select your role</option>
            <option value="1">Admin</option>
            <option value="2">Centra</option>
            <option value="3">Harbor</option>
          </select>

          <button type="submit" className="enter-button">Enter</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Role;
