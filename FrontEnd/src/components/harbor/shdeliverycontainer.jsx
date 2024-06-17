import "../../styles/harbor_styles/shippinghistory.css";
import { Link } from "react-router-dom";

const Shiphistorycontainer = ({ Batch_ID, Checkpoint_ID, Harbor_Batch_Rescale, Arrival_Date, Transport_Status }) => {
  const getEllipseClass = (status) => {
    if (status === 3) return "ellipse delivered";
    if (status === 6) return "ellipse cancelled";
    return "ellipse";
  };

  return (
    <section className="s_contain_rectangleParent">
      <div className="s_contain_frameChild" />
      <div className="s_contain_batchIdParent">
        <b className="s_contain_batchId">Batch ID: {Batch_ID}</b>
        <b className="s_contain_batchId">Shipment ID: {Checkpoint_ID}</b>
        <div className="s_contain_quickRelevantInfo">Batch Rescale: {Harbor_Batch_Rescale}</div>
      </div>
      <div className="s_contain_frameWrapper">
        <div className="s_contain_frameParent">
          <div className="s_contain_frameContainer">
            <div className="s_contain_ellipseParent">
              <div className={getEllipseClass(Transport_Status === 3 ? 3 : null)} />
              <div className={getEllipseClass(Transport_Status === 6 ? 6 : null)} />
            </div>
          </div>
          <i className="s_contain_finishOnDate">Finish on: {Arrival_Date}</i>
        </div>
      </div>
    </section>
  );
};

export default Shiphistorycontainer;
