import "../../styles/admin-mobile-styles/ongoingshipments.css";
import OngoingShipmentHeader from "../../components/admin-mobile/osh.jsx";
import OSdeliverycontainer from "../../components/admin-mobile/osdeliverycontainer";
import { useEffect, useState } from "react";
import axios from 'axios';

const OngoingShipmentsAdminMobile = () => {
    const [harborpageinfo, setharborpageinfo] = useState(0);
    const [shipments, setShipments] = useState([]);

    useEffect(()=>{
        const fetchBatches = async () => {
            try {
              const response = await axios.get('http://localhost:8001/shipments/');
              const filteredBatches = response.data.filter(batch => batch.transport_status < 3);
              setShipments(filteredBatches);
            } catch (error) {
              console.error('Error fetching batches:', error);
            }
          };
      
        fetchBatches();
    },[])


    const handlepageclick = (newpage) => { setharborpageinfo(newpage); };
    const currentharborinfo = shipments.slice(harborpageinfo, harborpageinfo + 10);

    return (
        <div className="mainOngoingShipment">
            <OngoingShipmentHeader />
            {currentharborinfo.map((item, index) => (
                <OSdeliverycontainer
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

export default OngoingShipmentsAdminMobile;