// src/pages/confirmorder.jsx
import React, { useState } from 'react';
import "../../styles/harbor_styles/confirmorder.css";
import { useParams, Link } from 'react-router-dom';

const ConfirmOrder = () => {
  const { id } = useParams(); // Use 'id' to match the route parameter

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData
      }); 

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setUploadStatus('Upload successful. Photo URL: ' + responseData.photoUrl);
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploadStatus('Upload failed.');
    }
  };

  return (
    <div className="CO_madminConfirmOrder">
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
          <div className="CO_shippingId">Shipping ID: {id}</div> {/* Display the correct id */}
        </div>
        <div className="CO_frameItem" />
        <div className="CO_frameInner" />
        <section className="CO_dateLabel">
          <div className="CO_dateParent">
            <div className="CO_date">Date</div>
            <div className="CO_imageUploadLabel">
              <label htmlFor="CO_imageInput" className="CO_uploadImages">Upload images</label>
              <div className="CO_rectangleGroup">
                <div className="CO_rectangleDiv" />
                <input id="imageInput" type="file" accept="image/*" onChange={handleFileChange} className="CO_frameChild1" />
              </div>
            </div>
          </div>
        </section>
        <div className="CO_frameWrapper">
          <button className="CO_sendPickupNotificationWrapper" onClick={handleUpload}>
            <div className="CO_sendPickupNotification"> Send pickup notification </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConfirmOrder;
