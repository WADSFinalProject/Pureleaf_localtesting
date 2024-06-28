import "../../styles/admin-mobile-styles/ongoingshipments.css"
import { Link, useNavigate } from "react-router-dom"

const Selectconfirmcontainer = ({ ID_Data, batchID, transport_status, sentOnDate }) => {
  const getStatusColor = (dotIndex) => {
    return dotIndex === transport_status ? "#B6A248" : "#DFD9C3";
  };

  const navigate = useNavigate()

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div onClick={() => {
        const path = `/confirmorder/${ID_Data}`;
        if (path) {
          handleRedirect(path);
        }
      }
      
      } className="admin_osd_rectangleParent">
      <div className="admin_osd_frameChild" />
      <div className="admin_osd_shippingIdexample">Batch ID: {batchID}</div>
      <div className="admin_osd_shippingIdexample">Shipment ID: {ID_Data}</div>
      <div className="admin_osd_fRAME">
        <div className="admin_osd_shippingIDLabelParent">
          <div className="admin_osd_ongoingShipmentLabelParent">
            <div className="admin_osd_ongoingShipmentLabel">
              <div className="admin_osd_sentOnDateLabelParent">
                <div className="admin_osd_sentOnDateLabel">
                  <div className="admin_osd_sentOnDateLabelChild" />
                </div>
                <div className="admin_osd_dotsContainer">
                  {[1, 2, 3, 4, 5, 6].map((dotIndex) => (
                    <div
                      key={dotIndex}
                      className="admin_osd_frameInner"
                      style={{ backgroundColor: getStatusColor(dotIndex) }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <i className="admin_osd_sentOnDate">Sent on: {sentOnDate}</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selectconfirmcontainer;