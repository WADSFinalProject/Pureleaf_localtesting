import ShippingHistoryHeader from "../../components/admin-mobile/shiphisthead.jsx";
import Shiphistorycontainer from "../../components/admin-mobile/shdeliverycontainer.jsx";
/* import ShippingHistoryBody from "../components/ShippingHistoryBody"; */
import "../../styles/admin-mobile-styles/shippinghistory.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const ShippingHistoryAdminMobile = () => {
    const [batches, setBatches] = useState([]);
    const [shiphistpageinfo, setshiphistpageinfo] = useState(0);
    const handlepageclick = (newpage) => {setshiphistpageinfo(newpage)};
    const currentshiphistinfo = batches.slice(shiphistpageinfo, shiphistpageinfo + 10);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/shipments/`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log("API response:", response);
        const filteredBatches = response.data.filter(batch => batch.transport_status >= 3);;
        setBatches(filteredBatches);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin_shiphist_mharborShippingHistory">
      <section className="admin_shiphist_frameParent">
        <div className="admin_shiphist_parent">
          <Link to="/" className="admin_shiphist_backButton">{`<-`}</Link>
          <div className="admin_shiphist_shippingHistory">Shipping History</div>
        </div>
        <input className="admin_shiphist_frameChild" placeholder="Search" type="text" />
        {currentshiphistinfo.map((item, index) => (
          <Shiphistorycontainer
            key={item.batch_ID}
            Batch_ID={item.batch_ID}
            Checkpoint_ID={item.checkpoint_ID}
            Harbor_Batch_Rescale={item.harbor_batch_rescale}
            Arrival_Date={item.arrival_date}
            transport_status={item.transport_status}
          />
        ))}
      </section>
    </div>
  );
};

export default ShippingHistoryAdminMobile;
