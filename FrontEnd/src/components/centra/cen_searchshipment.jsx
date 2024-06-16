import "../../styles/centra_styles/centrahome.css";

const CentraSearchShipment = () => {
  return (
    <section className="centrashipmentsearch_Inner">
        {/* top part frame */}
      <div className="centrashipmentsearch_parentFrame">
         {/* profile pic, name, shipment track */}
        <div className="centrashipmentsearch_frameGroup"> 
           {/* name and profile picture */}
          <div className="centrashipmentsearch_profilepicParent">
             {/* profile picture */}
            <div className="centrashipmentsearch_frameChild" />
             {/* name and location wrapper */}
            <div className="centrashipmentsearch_frameWrapper">
                 {/* name and location */}
              <div className="centrashipmentsearch_fullnameParent">
                <h3 className="centrashipmentsearch_fullName">Full Name</h3>
                <div className="centrashipmentsearch_location">Location</div>
              </div>
            </div>
          </div>
           {/* shipment tracking search */}
          <div className="centrashipmentsearch_frameContainer">
            <div className="centrashipmentsearch_trackingShipmentParent">
              <div className="centrashipmentsearch_trackingShipment">
                Track your shipment
              </div>
              <input
                className="centrashipmentsearch_frameItem"
                placeholder="Resi number"
                type="text"
              />
            </div>
          </div>
        </div>
         {/* stuff to the side */}
          <div className="centrashipmentsearch_rectangleParent">
            <div className="centrashipmentsearch_frameInner" />
            <div className="centrashipmentsearch_rectangleDiv" />
        </div>
      </div>
    </section>
  );
};

export default CentraSearchShipment;
