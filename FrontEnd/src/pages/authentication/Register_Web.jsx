import React, { useState, useEffect, useRef } from 'react';
import '../../styles/authentication_styles/style.css';
import { FcGoogle } from 'react-icons/fc';
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '/src/images/authentication/logo.png';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [displayEmail, setDisplayEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const imageContainerRef = useRef(null);

  const handleChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setDisplayEmail(inputEmail)

    // const atIndex = inputEmail.indexOf('@');
    // if (atIndex > 0) {
    //   const maskedEmail = inputEmail.substring(0, atIndex).replace(/./g, '*') + inputEmail.substring(atIndex);
    //   setDisplayEmail(maskedEmail);
    // } else {
    //   setDisplayEmail(inputEmail);
    // }
  };

  const handlePhoneChange = (event) => {
    const inputPhone = event.target.value;
    const placeholder = "+62 | ";

    if (!inputPhone.startsWith(placeholder) && !inputPhone.startsWith('|')) {
      setPhone(placeholder);
    } else {
      setPhone(inputPhone);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const user = { email, username, password };
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to role selection page
      navigate('/role'); // Use navigate instead of history.push
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    if (imageContainerRef.current) {
      const divWidth = imageContainerRef.current.clientWidth;
      document.documentElement.style.setProperty('--div-width', `${divWidth}px`);
    }
  }, []);

  return (
    <div className="flex-container">
      <div className="image-container" ref={imageContainerRef}>
        <div className="background-image"></div>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="main-content">
        <h1 className="signup-title">GET STARTED</h1>
        <p className="subtitle-label">Create an account</p>

        <form onSubmit={handleSubmit}>
          <p className="fullname-label">NAME</p>
          <input
            type="text"
            className="fullname_text-field"
            placeholder="Enter your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <p className="email-label">E-MAIL</p>
          <input
            type="text"
            className="email_text-field"
            placeholder="Enter e-mail account"
            value={displayEmail}
            onChange={handleChange}
            required
          />

          <p className="signuppass-label">PASSWORD</p>
          <input
            type="password"
            className="signuppass_text-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-button">SIGN UP</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="alternative-signup">
          <div className="line"></div>
          <p className="separator-text">or sign up with</p>
          <div className="line"></div>
        </div>

        <div className="signupbtn-container">
          <button className="icon-button"><FcGoogle size={24} /></button>
          <button className="icon-button"><PiMicrosoftOutlookLogoFill size={30} style={{ color: '#0078d4' }} /></button>
        </div>

        <p className="login-label"><Link to="/" style={{ color: '#DFD9C3', textDecoration: 'none' }}>Already have an account? Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;
