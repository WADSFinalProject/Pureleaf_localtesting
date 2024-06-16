import "../../styles/harbor_styles/harborhomeComp.css";

const SearchShipment = () => {
  return (
    <section className="searchship_Inner">
        {/* top part frame */}
      <div className="searchship_parentFrame">
         {/* profile pic, name, shipment track */}
        <div className="searchship_frameGroup"> 
           {/* name and profile picture */}
          <div className="searchship_profilepicParent">
             {/* profile picture */}
            <div className="searchship_frameChild" />
             {/* name and location wrapper */}
            <div className="searchship_frameWrapper">
                 {/* name and location */}
              <div className="searchship_fullnameParent">
                <h3 className="searchship_fullName">Full Name</h3>
                <div className="searchship_location">Location</div>
              </div>
            </div>
          </div>
           {/* shipment tracking search */}
          <div className="searchship_frameContainer">
            <div className="searchship_trackingShipmentParent">
              <div className="searchship_trackingShipment">
                Track your shipment
              </div>
              <input
                className="searchship_frameItem"
                placeholder="Resi number"
                type="text"
              />
            </div>
          </div>
        </div>
         {/* stuff to the side */}
          <div className="searchship_rectangleParent">
            <div className="searchship_frameInner" />
            <div className="searchship_rectangleDiv" />
        </div>
      </div>
    </section>
  );
};

export default SearchShipment;
