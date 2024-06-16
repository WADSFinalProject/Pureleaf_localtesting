import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [userType, setUserType] = useState(() => {
    const storedUserType = sessionStorage.getItem('userType');
    return storedUserType ? JSON.parse(storedUserType) : null;
  });
  const [userData, setUserData] = useState(() => {
    const storedUserData = sessionStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    sessionStorage.setItem('userType', JSON.stringify(userType));
  }, [userType]);

  useEffect(() => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userType, setUserType, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
