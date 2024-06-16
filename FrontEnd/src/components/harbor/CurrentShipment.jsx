import "../../styles/harbor_styles/harborhomeComp.css"

const CurrentShipping = () => {
  return (
    <div className="cs_frameWrapper">
      <div className="cs_frameParent">
        <div className="cs_currentShippingParent">
          <div className="currentShipping">Current Shipping</div>
          <div className="cs_seeAll">{`See all  ->`}</div>
        </div>
        <div className="cs_rectangleParent">
          <div className="cs_frameChild" />
          <div className="cs_frameContainer">
            <div className="cs_exampleParent">
              <div className="cs_example">#XXXX-XXXXX</div>
              <div className="cs_currentLocationParent">
                <div className="cs_currentLocation">Current location</div>
                <div className="cs_example_long">Xxxxxx, Xxxxxxxx</div>
              </div>
              <div className="cs_statusParent">
                <div className="cs_status">Status</div>
                <div className="inTransit">In transit</div>
              </div>
            </div>
          </div>
          <div className="cs_frameItem" />
        </div>
      </div>
    </div>
  );
};

export default CurrentShipping;
