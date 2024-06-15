// ForgotPass_Web.jsx

import React, { useEffect, useRef } from 'react';
import '../../styles/authentication_styles/style.css';
import { Link } from 'react-router-dom';
import logo from '/src/images/authentication/logo.png';

const ForgotPass = () => {
  const imageContainerRef = useRef(null);

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
        <h1 className="forgotpass-title">Forgot your password?</h1>
        <p className="desc-label">Please enter the email address or phone number you'd like your password reset information to be sent to.</p>

        <p className="fp-label">Email address or phone number</p>
        <input type="text" className="fp_text-field" placeholder="Enter email address of phone number"/>

        <button className="reset-button">Request reset link</button>

        <p className="back-label"><Link to="/" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Back to login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPass;
