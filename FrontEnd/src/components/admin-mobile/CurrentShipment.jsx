import "../../styles/admin-mobile-styles/harborhomeComp.css";

const CurrentShipping = () => {
  return (
    <div className="admin_cs_frameWrapper">
      <div className="admin_cs_frameParent">
        <div className="admin_cs_currentShippingParent">
          <div className="currentShipping">Current Shipping</div>
          <div className="admin_cs_seeAll">{`See all  ->`}</div>
        </div>
        <div className="admin_cs_rectangleParent">
          <div className="admin_cs_frameChild" />
          <div className="admin_cs_frameContainer">
            <div className="admin_cs_exampleParent">
              <div className="admin_cs_example">#XXXX-XXXXX</div>
              <div className="admin_cs_currentLocationParent">
                <div className="admin_cs_currentLocation">Current location</div>
                <div className="admin_cs_example_long">Xxxxxx, Xxxxxxxx</div>
              </div>
              <div className="admin_cs_statusParent">
                <div className="admin_cs_status">Status</div>
                <div className="inTransit">In transit</div>
              </div>
            </div>
          </div>
          <div className="admin_cs_frameItem" />
        </div>
      </div>
    </div>
  );
};

export default CurrentShipping;
