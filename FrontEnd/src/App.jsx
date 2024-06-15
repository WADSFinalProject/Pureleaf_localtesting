import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './styles/style.css';
import { AuthContext, AuthProvider } from './AuthContext';
import Login from "./pages/authentication/Login_Web";
import Register from "./pages/authentication/Register_Web";
import ForgotPass from "./pages/authentication/ForgotPass_Web";
import ResetPass from "./pages/authentication/ResetPass_Web";
// import TestWeb from "./pages/test/test_web";
import TestWeb2 from "./pages/test/test_web2";
import TestWeb3 from "./pages/test/test_web3";
// import Dashboard from './pages/admin/Dashboard';

const App = () => {
  const { isAuthenticated, userType } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/resetpass" element={<ResetPass />} />
          </>
        ) : (
          <>
            {userType === 1 && <Route path="/" element={<TestWeb />} />}
            {/* {userType === 1 && <Route path="/" element={<Dashboard />} />} */}
            {userType === 2 && <Route path="/" element={<TestWeb2 />} />}
            {userType === 3 && <Route path="/" element={<TestWeb3 />} />}
            {/* {userType === 2 && <Route path="/" element={<CentraDashboard />} />}
            {userType === 3 && <Route path="/" element={<HarborDashboard />} />} */}
          </>
        )}
      </Routes>
    </Router>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
