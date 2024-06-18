import "../../styles/centra_styles/centrahome.css";
import { Link } from "react-router-dom";

const CentraCurrentShipping = ({batchID, date, status}) => {
  return (
    <div className="centracurrentShipment_frameWrapper">
      <div className="centracurrentShipment_frameParent">
        <div className="centracurrentShipment_currentShippingParent">
          <div className="centra_currentShipping">Current Batch</div>
          <Link to ="/ongoingbatch" className="centracurrentShipment_seeAll">{`See all  ->`}</Link>
        </div>
        <div className="centracurrentShipment_rectangleParent">
          <div className="centracurrentShipment_frameChild" />
          <div className="centracurrentShipment_frameContainer">
            <div className="centracurrentShipment_exampleParent">
              <div className="centracurrentShipment_example">#{batchID}</div>
              <div className="centracurrentShipment_currentLocationParent">
                <div className="centracurrentShipment_currentLocation">Date</div>
                <div className="centracurrentShipment_example_long">{date}</div>
              </div>
              <div className="centracurrentShipment_statusParent">
                <div className="centracurrentShipment_status">Status</div>
                <div className="inTransit">{status == 1 ? 'Drying' :
                                            status == 2 ? 'Powdering' : 
                                            'Shipping'}</div>
              </div>
            </div>
          </div>
          <div className="centracurrentShipment_frameItem" />
        </div>
      </div>
    </div>
  );
};

export default CentraCurrentShipping;
