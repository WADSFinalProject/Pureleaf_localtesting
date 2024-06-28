import "../../styles/admin-mobile-styles/shippinghistory.css"
import { Link } from "react-router-dom"

const Shiphistorycontainer = ({Batch_ID, transport_status, Arrival_Date, Harbor_Batch_Rescale }) => {
  console.log(transport_status)
  const getStatusColor = (dotIndex) => {
    return dotIndex === transport_status ? "#B6A248" : "#DFD9C3";
  };

  return (
    <section className="admin_s_contain_rectangleParent">
      <div className="admin_s_contain_frameChild" />
      <div className="admin_s_contain_batchIdParent">
        <b className="admin_s_contain_batchId">Batch ID: {Batch_ID}</b>
        <div className="admin_s_contain_quickRelevantInfo">Weight: {Harbor_Batch_Rescale} kg</div>
{/*         <div className="admin_s_contain_quickRelevantInfo">Finish on: {Arrival_Date}</div> */}
      </div>
      <div className="admin_s_contain_frameWrapper">
        <div className="admin_s_contain_frameParent">
          <div className="admin_s_contain_frameContainer">
            <div className="admin_s_contain_ellipseParent">
              <div className="admin_s_contain_lineWrapper">
                <div className="admin_s_contain_frameInner" />
              </div>
              <div className="admin_s_dotsContainer">
                  {[1, 2, 3, 4, 5, 6].map((dotIndex) => (
                    <div
                      key={dotIndex}
                      className="admin_s_frameInner"
                      style={{ backgroundColor: getStatusColor(dotIndex) }}
                    ></div>
                  ))}
                </div>
            </div>
          </div>
          <i className="admin_s_contain_finishOnDate">Finish on: {Arrival_Date}</i>
        </div>
      </div>
    </section>
  );
};

export default Shiphistorycontainer;

