import "../../styles/harbor_styles/ongoingshipments.css"
import { Link } from "react-router-dom"

const OSdeliverycontainer = ({ID_Data}) => {
    return (
        <Link to={`/confirmorder/${ID_Data}`} className="osd_rectangleParent">
          <div className="osd_frameChild" />
          <div className="osd_shippingIdexample">Shipment ID: {ID_Data}</div>
          <div className="osd_fRAME">
            <div className="osd_shippingIDLabelParent">
              <div className="osd_shippingIDLabel" />
              <div className="osd_ongoingShipmentLabelParent">
                <div className="osd_ongoingShipmentLabel">
                  <div className="osd_sentOnDateLabelParent">
                    <div className="osd_sentOnDateLabel">
                      <div className="osd_sentOnDateLabelChild" />
                    </div>
                    <div className="osd_frameItem" />
                  </div>
                </div>
                <i className="osd_sentOnDate">{`Sent on: <Date>`}</i>
              </div>
            </div>
          </div>
          <div className="osd_frameInner" />
        </Link>
      );
}

export default OSdeliverycontainer