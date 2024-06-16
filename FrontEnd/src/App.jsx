import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import Login from "./pages/authentication/Login_Web";
import Register from "./pages/authentication/Register_Web";
import Role from "./pages/authentication/Role_Web";
import ForgotPass from "./pages/authentication/ForgotPass_Web";
import ResetPass from "./pages/authentication/ResetPass_Web";
import TestWeb from "./pages/test/test_web";
import TestWeb2 from "./pages/test/test_web2";
import TestWeb3 from "./pages/test/test_web3";
import Dashboard from './pages/admin/Dashboard';
import History from './pages/admin/History';
import Ongoing from './pages/admin/Ongoing';
import Upcoming from './pages/admin/Upcoming';

const App = () => {
  const { isAuthenticated, userType } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/role" element={<Role />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/resetpass" element={<ResetPass />} />
          </>
        ) : (
          <>
            {userType === 1 && (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/ongoing" element={<Ongoing />} />
                <Route path="/upcoming" element={<Upcoming />} />
              </>
            )}
            {userType === 2 && <Route path="/" element={<TestWeb2 />} />}
            {userType === 3 && <Route path="/" element={<TestWeb3 />} />}
            <Route path="*" element={<Navigate to="/" />} />
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
