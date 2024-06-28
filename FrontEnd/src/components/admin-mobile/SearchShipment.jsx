import "../../styles/admin-mobile-styles/harborhomeComp.css";

const SearchShipment = () => {
  return (
    <section className="admin_Inner">
        {/* top part frame */}
      <div className="admin_parentFrame">
         {/* profile pic, name, shipment track */}
        <div className="admin_frameGroup"> 
           {/* name and profile picture */}
          <div className="admin_profilepicParent">
             {/* profile picture */}
            <div className="admin_frameChild" />
             {/* name and location wrapper */}
            <div className="admin_frameWrapper">
                 {/* name and location */}
              <div className="admin_fullnameParent">
                <h3 className="admin_fullName">Full Name</h3>
                <div className="admin_location">Location</div>
              </div>
            </div>
          </div>
           {/* shipment tracking search */}
          <div className="admin_frameContainer">
            <div className="admin_trackingShipmentParent">
              <div className="admin_trackingShipment">
                Track your shipment
              </div>
              <input
                className="admin_frameItem"
                placeholder="Resi number"
                type="text"
              />
            </div>
          </div>
        </div>
         {/* stuff to the side */}
          <div className="admin_rectangleParent">
            <div className="admin_frameInner" />
            <div className="admin_rectangleDiv" />
        </div>
      </div>
    </section>
  );
};

export default SearchShipment;
