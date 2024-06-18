import React, { useState } from 'react';
import "../../styles/centra_styles/centraconfirmorder.css";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NewBatchFirst = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/newbatch2');
  };

  return (
    <div className="centraNB_madminConfirmOrder">
      <div className="centraNB_confirmShipmentParent">
        <div className="centraNB_confirmShipment">New Batch</div>
        <div className="centraNB_cancelButton">
          <Link to="/ongoingshipments" className="centraNB_cancel">Cancel</Link>
        </div>
      </div>
      <main className="centraNB_rectangleParent">
        <div className="centraNB_frameChild" />
        <div className="centraNB_shippingDetails">Information</div>
        <div className="centraNB_shippingIdWrapper">
        <div className="centraNB_shippingId">PIC </div> {/*Add Batch ID Logic Here */}

        </div>
        <section className="centraNB_dateLabel">
          <div className="centraNB_dateParent">
            <div className="centraNB_imageUploadLabel">
              <div className="centraNB_rectangleGroup">
              </div>
            </div>
          </div>
        </section>
        <div className="centraNB_frameWrapper">
          <button onClick={handleClick} className="centraNB_sendPickupNotificationWrapper">
            <div className="centraNB_sendPickupNotification"> Next </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default NewBatchFirst;
