import React, { useState, useEffect, useContext } from 'react';
import "../../styles/harbor_styles/confirmorder.css";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs'; // Import dayjs for date formatting

const ConfirmOrder = () => {
  const { id } = useParams(); // Use 'id' to match the route parameter
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [batchRescale, setBatchRescale] = useState('');
  const [transportStatus, setTransportStatus] = useState('');
  const [statusDateChange, setStatusDateChange] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        console.log("userData:", userData);  // Debugging log
        const harborID = userData.harbor_ID;
        console.log("harborID:", harborID);  // Debugging log
        const response = await fetch(`http://127.0.0.1:8003/shipment/${harborID}/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShipmentDetails(data);
        setBatchRescale(data.harbor_batch_rescale);
        setTransportStatus(data.transport_status);
      } catch (error) {
        console.error('Error fetching shipment details:', error);
      }
    };

    if (userData) {
      fetchShipmentDetails();
    }
  }, [id, userData]);

  const handleUpdate = async () => {
    const harborID = userData.harbor_ID;
    const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    setStatusDateChange(currentDateTime);
  
    try {
      // Update shipment status
      const shipmentStatusResponse = await fetch(`http://127.0.0.1:8003/updateShipment/${harborID}/${shipmentDetails.checkpoint_ID}/${transportStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!shipmentStatusResponse.ok) {
        const shipmentError = await shipmentStatusResponse.json();
        toast.error(`Failed to update shipment status: ${shipmentError.detail}`);
        return; // Exit the function if this update fails
      }
  
      // Update harbor shipment
      const harborShipmentResponse = await fetch(`http://127.0.0.1:8003/update_harbor_shipment/${harborID}/${shipmentDetails.checkpoint_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          harbor_batch_rescale: batchRescale,
          transport_status: transportStatus,
          status_date_change: currentDateTime,
          hg_user_ID: userData.hg_user_ID
        }),
      });
  
      if (!harborShipmentResponse.ok) {
        const harborError = await harborShipmentResponse.json();
        toast.error(`Failed to update harbor shipment: ${harborError.detail}`);
        return; // Exit the function if this update fails
      }
  
      // If both updates are successful
      toast.success('Shipment Information has successfully been updated.');
      setTimeout(() => {
        navigate('/ongoingshipments');
      }, 2000); // Redirect after 2 seconds
  
    } catch (error) {
      console.error('Error updating information:', error);
      toast.error('Update failed.');
    }
  };
  


  if (!shipmentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CO_madminConfirmOrder">
      <ToastContainer />
      <div className="CO_confirmShipmentParent">
        <div className="CO_confirmShipment">Confirm Shipment</div>
        <div className="CO_cancelButton">
          <Link to="/ongoingshipments" className="CO_cancel">Cancel</Link>
        </div>
      </div>
      <main className="CO_rectangleParent">
        <div className="CO_frameChild" />
        <div className="CO_shippingDetails">Shipping details:</div>
        <div className="CO_shippingIdWrapper">
          <div className="CO_shippingId">Shipping ID: {shipmentDetails.checkpoint_ID} | Batch ID: {shipmentDetails.batch_ID}</div> 
        </div>
        <div className="CO_shippingIdWrapper">
          <div className="CO_shippingId">Batch Rescale Weight (KG): 
            <input 
              type="number" 
              value={batchRescale} 
              onChange={(e) => setBatchRescale(e.target.value)} 
            />
          </div> 
        </div>
        <div className="CO_shippingIdWrapper">
          <div className="CO_shippingId">Transport Status: 
            <select 
              value={transportStatus} 
              onChange={(e) => setTransportStatus(e.target.value)}
            >
              <option value="1"> (1) Batch Received</option>
              <option value="2"> (2) In Transit</option>
              <option value="3"> (3) Delivered</option>
              <option value="4"> (4) Delayed</option>
              <option value="5"> (5) On hold</option>
              <option value="6"> (6) Cancelled</option>
            </select>
          </div>
        </div>
        <div className="CO_shippingIdWrapper">
          <div className="CO_shippingId">Status Date Change: {statusDateChange}</div> 
        </div>
        <div className="CO_shippingDetails">Handled by:</div>
        <div className="CO_shippingIdWrapper">
          <div className="CO_shippingId">Harbor: {userData ? userData.harbor_name : 'Harbor Name'} </div> 
        </div>
        <div className="CO_shippingIdWrapper">
          <div className="CO_shippingId">Harbor Guard Name: {userData ? userData.username : 'Harbor Guard Name'} </div> 
        </div>
        <div className="CO_shippingIdWrapper">
          <div className="CO_shippingId">Harbor Guard ID: {userData.hg_user_ID} </div> 
        </div>
        <div className="CO_frameWrapper">
          <button className="CO_sendPickupNotificationWrapper" onClick={handleUpdate}>
            <div className="CO_sendPickupNotification"> Confirm Information </div>
          </button>
        </div>
        {uploadStatus && <div className="CO_uploadStatus">{uploadStatus}</div>}
      </main>
    </div>
  );
};

export default ConfirmOrder;
