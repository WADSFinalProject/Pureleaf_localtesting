import React, { useEffect, useState } from "react";
import Shiphistorycontainer from "../../components/harbor/shdeliverycontainer.jsx";
import "../../styles/harbor_styles/shippinghistory.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ShippingHistory = () => {
  const [shiphistpageinfo, setshiphistpageinfo] = useState(0);
  const [batches, setBatches] = useState([]);
  const harborID = JSON.parse(sessionStorage.getItem("userData")).harbor_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for harbor_ID:", harborID);
        const response = await axios.get(`http://localhost:8003/shipment/${harborID}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log("API response:", response);
        const filteredBatches = response.data.filter(batch => batch.transport_status === 3 || batch.transport_status === 6);
        setBatches(filteredBatches);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };

    fetchData();
  }, [harborID]);

  const handlepageclick = (newpage) => {
    setshiphistpageinfo(newpage);
  };

  const currentshiphistinfo = batches.slice(shiphistpageinfo, shiphistpageinfo + 10); // Adjust the number of items per page as needed

  return (
    <div className="shiphist_mharborShippingHistory">
      <section className="shiphist_frameParent">
        <div className="shiphist_parent">
          <Link to="/" className="shiphist_backButton">{`<-`}</Link>
          <h3 className="shiphist_shippingHistory">Shipping history</h3>
        </div>
        <input className="shiphist_frameChild" placeholder="Search" type="text" />
        Filter By
        {currentshiphistinfo.map((item, index) => (
          <Shiphistorycontainer 
            key={item.batch_ID} 
            Batch_ID={item.batch_ID} 
            Checkpoint_ID={item.checkpoint_ID} 
            Harbor_Batch_Rescale={item.harbor_batch_rescale} 
            Arrival_Date={item.arrival_date}
            Transport_Status={item.transport_status}
          />
        ))}
      </section>
      <div className="pagination">
        {Array.from({ length: Math.ceil(batches.length / 10) }).map((_, index) => (
          <button key={index} onClick={() => handlepageclick(index * 10)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShippingHistory;
