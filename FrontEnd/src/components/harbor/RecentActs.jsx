import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/harbor_styles/harborhomeComp.css';
import { AuthContext } from '../../../src/AuthContext.jsx'; 

const RecentActivities = () => {
  const { userData } = useContext(AuthContext);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData && userData.harbor_ID) {
      const fetchShipments = async () => {
        try {
          const response = await axios.get(`http://localhost:8003/recentshipment/${userData.harbor_ID}`);
          setShipments(response.data);
        } catch (error) {
          console.error('Error fetching shipments:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchShipments();
    } else {
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData || !userData.harbor_ID || shipments.length === 0) {
    return <div>No recent activities available.</div>;
  }

  const shipment = shipments[0]; // Only show the first shipment

  return (
    <div className="ra_recentActivitiesParent">
      <div className="recentActivies" style={{ fontWeight: 'bold' }}>Recent Arrivals</div>
      <div className="ra_rectangleParent">
        <div className="ra_frameWrapper">
          <div className="ra_exampleParent">
            <div className="ra_example">Shipment ID: {shipment.checkpoint_ID}</div>
            <div className="ra_inTransitStatus">
              <div className="ra_status">Batch ID: {shipment.batch_ID}</div>
              <div className="ra_inTransit">Status: {shipment.transport_status}</div>
            </div>
          </div>
        </div>
        <div className="ra_bordersContainer" />
      </div>
    </div>
  );
};

export default RecentActivities;
