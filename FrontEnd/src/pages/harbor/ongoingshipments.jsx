import "../../styles/harbor_styles/ongoingshipments.css";
import OngoingShipmentHeader from "../../components/harbor/osh";
import OSdeliverycontainer from "../../components/harbor/osdeliverycontainer";
import { useEffect, useState } from "react";
import axios from 'axios';

const Ongoingshipments = () => {
    const [harborpageinfo, setharborpageinfo] = useState(0);
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        const harborID = JSON.parse(sessionStorage.getItem('userData')).harbor_ID;

        const fetchShipments = async () => {
            try {
                const response = await axios.get(`http://localhost:8003/shipment/${harborID}`);
                const filteredShipments = response.data.filter(shipment =>
                    [1, 2, 4, 5].includes(shipment.transport_status)
                );
                setShipments(filteredShipments);
            } catch (error) {
                console.error("Error fetching shipment data:", error);
            }
        };

        fetchShipments();
    }, []);

    const handlepageclick = (newpage) => { setharborpageinfo(newpage); };
    const currentharborinfo = shipments.slice(harborpageinfo, harborpageinfo + 10);  

    return (
        <div className="mainOngoingShipment">
            <OngoingShipmentHeader />
            {currentharborinfo.map((item, index) => (
                <OSdeliverycontainer 
                    key={item.checkpoint_ID} 
                    ID_Data={item.checkpoint_ID} 
                    shipmentID={item.checkpoint_ID} 
                    batchID={item.batch_ID} 
                    batchRescale={item.harbor_batch_rescale} 
                    sentOnDate={item.sent_date} 
                />
            ))}
        </div>
    );
};

export default Ongoingshipments;
