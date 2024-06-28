import Cookies from 'js-cookie';
import "../../styles/admin-mobile-styles/adminmobilehome.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminHomeMobile = () => {
  const [harborpageinfo, setharborpageinfo] = useState(0);
  const [shipment, setShipment] = useState(null);
  const [userData, setUserData] = useState("Account Info"); // State to store user data

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = Cookies.get('user_id'); // Get the user ID from cookies
      if (!userId) {
        console.error('User ID not found in cookies');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/user/${userId}`);
        console.log('User data:', response.data); // Log the response data
        setUserData(response.data); // Store user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    const fetchFirstShipment = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/shipments/`);

        console.log("API response:", response.data);

        if (response.data.length > 0) {
          const firstShipment = response.data[0];
          console.log("First shipment:", firstShipment);
          setShipment(firstShipment); // Set the first shipment to state
        } else {
          console.log("No shipments found.");
          setShipment(null); // Clear shipment state if no shipments found
        }
      } catch (error) {
        console.error("Error fetching shipment data:", error);
        setShipment(null); // Clear shipment state in case of error
      }
    };

    fetchFirstShipment();
  }, []);

  const handleLogout = () => {
    Cookies.remove('user_id'); // Remove the user ID from cookies
    window.location.href = '/login'; // Redirect to the login page
  };

  const transportStatusLabels = {
    1: 'Batch Received',
    2: 'In Transit',
    3: 'Delivered',
    4: 'Delayed',
    5: 'On hold',
    6: 'Cancelled'
  };

  const currentharborinfo = shipment && shipment.length > 0
    ? shipment.slice(harborpageinfo, harborpageinfo + 10)
    : [];

  return (
    <div className="admin-mobile-home-container">
      <div className='user-detail-admin-mobile'>
        <div className="profile-picture-admin-mobile"></div>
        <div className="profile-details-admin-mobile">
          <div className="profile-name-admin-mobile">
            {userData?.username}
          </div>
          <div className="profile-email-admin-mobile">{userData?.email}</div>
        </div>
        <div onClick={handleLogout} className="logout-button">
          <FaSignOutAlt size={24} color="black" />
        </div>
      </div>

      <div className='search-admin-mobile'>
        <div className='search-container-admin-mobile'>
          <div className='input-container-admin-mobile'>
            <input id='batch-number' type='text' placeholder='Ref number' />
          </div>
          <div className='search-btn-admin-mobile'></div>
        </div>
      </div>

      <div className='recents-admin-mobile'>
        <div className='recents-label-admin-mobile'>
          <label>Upcoming</label>
          <span>See All</span>
        </div>
        {shipment && (
          <div className='batch-display-home-admin-mobile'>
            <div className='batch-details-admin-mobile'>
              <h2>Batch ID: {shipment.batch_ID}</h2>
              <h3>Weight:</h3>
              <p>{shipment.harbor_batch_rescale} kg</p>
              <h3>Status:</h3>
              <p>{transportStatusLabels[shipment.transport_status]}</p>
              <h3>Sent on: {shipment.sent_date}</h3>
            </div>
            <div className='batch-display-color-admin-mobile' />
          </div>
        )}

        <div className='feature-container-admin-mobile'>
          <label>Features</label>
          <div className='features-admin-mobile'>
            <a href="/ongoingshipments" className="feature-admin-mobile">Ongoing Shipments</a>
            <a href="/selectconfirm" className="feature-admin-mobile">Confirm Order</a>
            <a href="/shippinghistory" className="feature-admin-mobile">Order History</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomeMobile;
