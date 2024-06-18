import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/harbor_styles/harborhomeComp.css';
import { AuthContext } from '../../../src/AuthContext.jsx'; 

const RecentActivities = () => {
  const { userData } = useContext(AuthContext);
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    if (userData && userData.harbor_ID) {
      const fetchShipments = async () => {
        try {
          const response = await axios.get(`http://localhost:8003/shipment/${userData.harbor_ID}`);
          setShipments(response.data);
        } catch (error) {
          console.error('Error fetching shipments:', error);
        }
      };

      fetchShipments();
    }
  }, [userData]);

  if (!userData || !userData.harbor_ID) {
    return <div>No Harbor ID available in user data</div>;
  }

  return (
    <div className="ra_recentActivitiesParent">
      <div className="recentActivies" style={{ fontWeight: 'bold' }}>Recent Activities</div>
      <div className="ra_rectangleParent">
        {shipments.map((shipment, index) => (
          <div key={index} className="ra_frameWrapper">
            <div className="ra_exampleParent">
              <div className="ra_example">Shipment ID: {shipment.checkpoint_ID}</div>
              <div className="ra_inTransitStatus">
                <div className="ra_status">Batch ID: {shipment.batch_ID}</div>
                <div className="ra_inTransit">Status: {shipment.transport_status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
