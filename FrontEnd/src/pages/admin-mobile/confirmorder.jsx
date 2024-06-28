import "../../styles/admin-mobile-styles/confirmorder.css"
import { useParams, Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';

function ConfirmOrderAdminMobile() {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [receptionNotes, setReceptionNotes] = useState('');
  const navigate = useNavigate();
  const { shipmentID } = useParams();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8001/confirmorder/${shipmentID}/${date}/${weight}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to store batch data');
      }

      const data = await response.json();
      console.log('Batch data stored successfully:', data);
      navigate('/'); // Redirect to home or another page after successful submission
    } catch (error) {
      console.error('Error storing batch data:', error);
      // Handle error, show message to user, etc.
    }
  };


  return (
    <div className='admin-mobile-confirm'>
      <div className='admin-mobile-confirm-header'>
        <a href='/' className="back-btn">Back</a>
        <h2>Confirm Order</h2>
      </div>

      <div className='batch-edit-admin-mobile-confirm'>
          <div className='detail-form-admin-mobile-confirm'>
            <h2>Shipping ID</h2>
            <span>{shipmentID}</span>
            <h2>Date</h2>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            <h2>Weight</h2>
            <input type='text' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='Weight (in kg)' />
            <h2>Reception Notes</h2>
            <textarea type='text' value={receptionNotes} onChange={(e) => setReceptionNotes(e.target.value)} rows={15} placeholder='Reception Notes' />
          </div>
          <div className='batch-buttons-admin-mobile-confirm'>
            <div className='batch-btn-admin-mobile-confirm' onClick={handleSubmit}>Confirm</div>
          </div>
      </div>
    </div>
  )
}

export default ConfirmOrderAdminMobile