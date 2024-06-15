import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../styles/authentication_styles/style.css';
import { FcGoogle } from 'react-icons/fc';
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from '/src/images/authentication/logo.png';
import { AuthContext } from '../../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const imageContainerRef = useRef(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserType, setUserData } = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Login successful', response.data);
      const { uid, user_type } = response.data;
      Cookies.set('user_id', uid); // Store user ID in a cookie
      setIsAuthenticated(true);
      setUserType(user_type);

      // Fetch user data
      const userResponse = await axios.get(`http://localhost:8000/user/${uid}`);
      setUserData(userResponse.data); // Store user data in context

      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed: ' + (error.response?.data?.detail || error.message));
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
        <h1 className="login-title">WELCOME</h1>
        <p className="subtitle-login">Sign into your account</p>

        <p className="user-label">E-MAIL</p>
        <input
          type="text"
          className="user_text-field"
          placeholder="Enter e-mail account"
          value={email}
          onChange={handleEmailChange}
        />

        <p className="pass-label">PASSWORD</p>
        <input 
          type="password" 
          className="pass_text-field" 
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button className="login-button" onClick={handleLogin}>LOGIN</button>
        {error && <p className="error-message">{error}</p>}

        <div className="alternative-login">
          <div className="line"></div>
          <p className="separator-text">or log in with</p>
          <div className="line"></div>
        </div>

        <div className="button-container">
          <button className="icon-button"><FcGoogle size={24} /></button>
          <button className="icon-button"><PiMicrosoftOutlookLogoFill size={30} style={{ color: '#0078d4' }} /></button>
        </div>

        <p className="forgotpass-label"><Link to="/forgotpass" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Forgot your password?</Link></p>
        <p className="signup-label"><Link to="/register" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Don't have an account? <span style={{ borderBottom: '1px solid #FAF9EB' }}>Sign up</span></Link></p>
      </div>
    </div>
  );
};

export default Login;
