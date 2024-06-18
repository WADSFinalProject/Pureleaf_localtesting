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

import BatchHistory from './pages/centra/batchhistory';
import Centrahome from './pages/centra/centrahome';
import MCentraAddPowdered from './pages/centra/newbatchaddpowder';
import MCentraAddWet from './pages/centra/newbatchaddwet';
import MCentraAddDry from './pages/centra/newbatchdryleaves';
import MCentraNewBatchDetails from './pages/centra/newbatchdetails';
import MCentraShipmentConfirmed from './pages/centra/newbatchconfirmed';
import NewBatchFirst from './pages/centra/newbatchstart';
import OngoingBatches from './pages/centra/ongoingbatches';

import ConfirmOrder from './pages/harbor/confirmorder';
import Harborhome from './pages/harbor/harborhome';
import Ongoingshipments from './pages/harbor/ongoingshipments';
import ShippingHistory from './pages/harbor/shippinghistory';

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
                <Route path="/login" element={<Login />} />
              </>
            )}
            {userType === 2 && (
              <>
                <Route path="/" element={<Centrahome />} />
                <Route path="/newbatch1" element={<NewBatchFirst />} />
                <Route path="/newbatch2" element={<MCentraAddWet />} />
                <Route path="/newbatch3/:batchID" element={<MCentraAddDry />} />
                <Route path="/newbatch4/:batchID" element={<MCentraAddPowdered />} />
                <Route path="/newbatch5/:batchID" element={<MCentraNewBatchDetails />} />
                <Route path="/newbatch6" element={<MCentraShipmentConfirmed />} />
                <Route path="/ongoingbatch" element={<OngoingBatches />} />
                <Route path="/batchhist" element={<BatchHistory />} />
              </>
            )}
            {userType === 3 && (
              <React.Fragment>
                <Route path="/harborhome" element={<Harborhome />} />
                <Route path="*" element={<Navigate to="/harborhome" />} />
                <Route path="/" element={<Harborhome />} />
                <Route path="/ongoingshipments" element={<Ongoingshipments />} />
                <Route path="/confirmorder/:id" element={<ConfirmOrder />} /> 
                <Route path="/shippinghistory" element={<ShippingHistory />} />
                <Route path="/login" element={<Login />} />
              </React.Fragment>
            )}
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
