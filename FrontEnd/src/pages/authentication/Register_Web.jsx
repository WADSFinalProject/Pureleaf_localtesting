// Register_Web.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/authentication_styles/style.css';
import { FcGoogle } from 'react-icons/fc';
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import logo from '/src/images/authentication/logo.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const imageContainerRef = useRef(null);

  const handleChange = (event) => {
    const inputEmail = event.target.value;
    const atIndex = inputEmail.indexOf('@');
    const maskedEmail = atIndex > 0 ? inputEmail.substring(0, atIndex).replace(/./g, '*') + inputEmail.substring(atIndex) : inputEmail;
    setEmail(maskedEmail);
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

        <p className="fullname-label">NAME</p>
        <input type="text" className="fullname_text-field" placeholder="Enter your full name"/>

        <p className="email-label">E-MAIL</p>
        <input
          type="text"
          className="email_text-field"
          placeholder="Enter e-mail account"
          value={email}
          onChange={handleChange}
        />

        <p className="phone-label">PHONE NUMBER</p>
        <input
          type="text"
          className="phone_text-field"
          placeholder="+62 | Enter your phone number"
          value={phone}
          onChange={handlePhoneChange}
        />

        <p className="signuppass-label">PASSWORD</p>
        <input type="password" className="signuppass_text-field" placeholder="Enter your password"/>

        <button className="signup-button">SIGN UP</button>

        <div className="alternative-signup">
          <div className="line"></div>
          <p className="separator-text">or sign up with</p>
          <div className="line"></div>
        </div>

        <div className="signupbtn-container">
          <button className="icon-button"><FcGoogle size={24} /></button>
          <button className="icon-button"><PiMicrosoftOutlookLogoFill size={30} style={{ color: '#0078d4' }} /></button>
        </div>

        <p className="login-label"><Link to="/" style={{ color: '#DFD9C3', textDecoration: 'none'  }}>Already have an account? Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;