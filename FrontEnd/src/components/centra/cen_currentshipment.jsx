import "../../styles/centra_styles/centrahome.css";

const CentraCurrentShipping = () => {
  return (
    <div className="centracurrentShipment_frameWrapper">
      <div className="centracurrentShipment_frameParent">
        <div className="centracurrentShipment_currentShippingParent">
          <div className="centra_currentShipping">Current Batch</div>
          <div className="centracurrentShipment_seeAll">{`See all  ->`}</div>
        </div>
        <div className="centracurrentShipment_rectangleParent">
          <div className="centracurrentShipment_frameChild" />
          <div className="centracurrentShipment_frameContainer">
            <div className="centracurrentShipment_exampleParent">
              <div className="centracurrentShipment_example">#XXXX-XXXXX</div>
              <div className="centracurrentShipment_currentLocationParent">
                <div className="centracurrentShipment_currentLocation">Current location</div>
                <div className="centracurrentShipment_example_long">Xxxxxx, Xxxxxxxx</div>
              </div>
              <div className="centracurrentShipment_statusParent">
                <div className="centracurrentShipment_status">Status</div>
                <div className="inTransit">In transit</div>
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
