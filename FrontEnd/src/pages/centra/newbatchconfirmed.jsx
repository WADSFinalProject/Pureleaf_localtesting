import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/centra_styles/newbatch.css";

const MCentraShipmentConfirmed = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ongoingshipments');
  };

  return (
    <div className="NBSC_mcentra-shipment-confirmed" onClick={handleClick}>
      <b className="NBSC_woohoo">Woohoo!</b>
      <i className="NBSC_shipment-has-been">
        Shipment has been sent to Harbor and XYZ
      </i>
      <div className="NBSC_mcentra-shipment-confirmed-child" />
      <div className="NBSC_mcentra-shipment-confirmed-item" />
      <div className="NBSC_mcentra-shipment-confirmed-inner" />
    </div>
  );
};

export default MCentraShipmentConfirmed;