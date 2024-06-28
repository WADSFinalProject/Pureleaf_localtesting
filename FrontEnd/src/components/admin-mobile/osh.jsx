/*Ongoing Shipment Header*/

import React from "react";
import { Link } from "react-router-dom";    
import "../../styles/admin-mobile-styles/ongoingshipments.css"

const OngoingShipmentHeader = () => {
  return (
    <section className="admin_osh_frameParent">
      <div className="admin_osh_parent">
        <Link to="/" className="admin_osh_backButton">{`<-`}</Link>
        <div className="admin_osh_ongoingShipmentWrapper">
          <div className="admin_osh_ongoingShipment">Ongoing Shipment</div>
        </div>
      </div>
      <input className="admin_osh_frameChild" placeholder="Search" type="text" />
    </section>

  );    
};

export default OngoingShipmentHeader;
