/*Ongoing Shipment Header*/

import React from "react";
import { Link } from "react-router-dom";    
import "../../styles/harbor_styles/ongoingshipments.css"

const OngoingShipmentHeader = () => {
  return (
    <section className="osh_frameParent">
      <div className="osh_parent">
        <Link to="/" className="osh_backButton">{`<-`}</Link>
        <div className="osh_ongoingShipmentWrapper">
          <h3 className="osh_ongoingShipment">Ongoing Shipment</h3>
        </div>
      </div>
      <input className="osh_frameChild" placeholder="Search" type="text" />
    </section>

  );    
};

export default OngoingShipmentHeader;
