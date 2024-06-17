import "../../styles/harbor_styles/harborhomeComp.css";

import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext'; 

const SearchShipment = () => {
  const { isAuthenticated, userData } = useContext(AuthContext);

  return (
    <section className="searchship_Inner">
      <div className="searchship_parentFrame">
        <div className="searchship_frameGroup">
          <div className="searchship_profilepicParent">
            <div className="searchship_frameChild" />
            <div className="searchship_frameWrapper">
              <div className="searchship_fullnameParent">
                <h3 className="searchship_fullName">{userData ? userData.username : 'Full Name'}</h3>
                <div className="searchship_location">{userData ? userData.harbor_name : 'Harbor Name'}</div>
              </div>
            </div>
          </div>
          <div className="searchship_frameContainer">
            <div className="searchship_trackingShipmentParent">
              <div className="searchship_trackingShipment">
                Track your shipment
              </div>
              <input
                className="searchship_frameItem"
                placeholder="Resi number"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="searchship_rectangleParent">
          <div className="searchship_frameInner" />
          <div className="searchship_rectangleDiv" />
        </div>
      </div>
    </section>
  );
};

export default SearchShipment;
