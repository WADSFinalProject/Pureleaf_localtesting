import "../../styles/harbor_styles/ongoingshipments.css";
import { Link } from "react-router-dom";

const OSdeliverycontainer = ({ ID_Data, shipmentID, batchID, batchRescale, sentOnDate }) => {
    return (
        <Link to={`/confirmorder/${ID_Data}`} className="osd_rectangleParent">
            <div className="osd_frameChild" />
            <div className="osd_shippingIdexample">Shipment ID: {shipmentID}</div>
            <div className="osd_shippingIdexample">Batch ID: {batchID}</div>
            <div className="osd_shippingIdexample">Batch Rescale: {batchRescale}</div>
            <div className="osd_fRAME">
                <div className="osd_shippingIDLabelParent">
                    <div className="osd_ongoingShipmentLabelParent">
                        <i className="osd_sentOnDate">Sent on: {sentOnDate}</i>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OSdeliverycontainer;
