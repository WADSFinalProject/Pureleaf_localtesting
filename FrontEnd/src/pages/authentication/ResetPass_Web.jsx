// ForgotPass_Web.jsx

import React, { useEffect, useRef } from 'react';
import '../../styles/authentication_styles/style.css';
import { Link } from 'react-router-dom';
import logo from '/src/images/authentication/logo.png';

const ResetPass = () => {
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
        <h1 className="resetpass-title">Reset password</h1>

        <p className="pass-rplabel">New password</p>
        <input type="password" className="pass_rptext-field" placeholder="Create a new password"/>

        <p className="confirm-rplabel">Confirm password</p>
        <input type="password" className="confirm_rptext-field" placeholder="Confirm new password"/>

        <button className="resetpass-button">Reset password</button>

        <p className="resetback-label"><Link to="/" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Back to login</Link></p>
      </div>
    </div>
  );
};

export default ResetPass;