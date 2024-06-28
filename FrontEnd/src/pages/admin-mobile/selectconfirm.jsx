import "../../styles/admin-mobile-styles/ongoingshipments.css";
import OngoingShipmentHeader from "../../components/admin-mobile/osh.jsx";
import { useEffect, useState } from "react";
import axios from 'axios';
import Selectconfirmcontainer from "../../components/admin-mobile/selectconfirmcontainer.jsx";
import { Link } from "react-router-dom";

const Selectconfirmadminmobile = () => {
    const [harborpageinfo, setharborpageinfo] = useState(0);
    const [shipments, setShipments] = useState([]);

    useEffect(()=>{
        const fetchBatches = async () => {
            try {
              const response = await axios.get('http://127.0.0.1:8001/shipments/');
              const filteredBatches = response.data.filter(batch => batch.transport_status === 2);
              console.log(response.data);
              setShipments(filteredBatches);
            } catch (error) {
              console.error('Error fetching batches:', error);
            }
          };
      
        fetchBatches();
    },[])

    const currentharborinfo = shipments.slice(harborpageinfo, harborpageinfo + 10);

    return (
        <div className="mainOngoingShipment">
            <section className="admin_osh_frameParent">
                <div className="admin_osh_parent">
                    <Link to="/" className="admin_osh_backButton">{`<-`}</Link>
                    <div className="admin_osh_ongoingShipmentWrapper">
                        <div className="admin_osh_ongoingShipment">Select Order to Confirm</div>
                    </div>
                </div>
            </section>
            {currentharborinfo.map((item, index) => (
                <Selectconfirmcontainer
                    key={item.checkpoint_ID}
                    ID_Data={item.checkpoint_ID}
                    transport_status={item.transport_status}
                    shipmentID={item.checkpoint_ID}
                    batchID={item.batch_ID}
                    batchRescale={item.harbor_batch_rescale}
                    sentOnDate={item.sent_date}
                />
            ))}
        </div>
    );
};

export default Selectconfirmadminmobile;