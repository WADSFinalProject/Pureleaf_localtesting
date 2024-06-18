import "../../styles/centra_styles/batchcontainer.css"
import { Link, useNavigate } from "react-router-dom"

const BatchContainer = ({Batch_ID, date, status}) => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    console.log(path)
    navigate(path);
  };

  const getRedirectPath = () => {
    switch (status) {
      case 1:
        return `/newbatch3/${Batch_ID}`;
      case 2:
        return `/newbatch4/${Batch_ID}`;
      case 3:
        return `/newbatch5/${Batch_ID}`;
      default:
        return null;
    }
  };

  return (
    <section
      className="s_contain_rectangleParent"
      onClick={() => {
        const path = getRedirectPath();
        if (path) {
          handleRedirect(path);
        }
      }}
    >
      <div className="s_contain_frameChild" />
      <div className="s_contain_batchIdParent">
        <b className="s_contain_batchId">Batch ID: {Batch_ID}</b>
        <div className="centracurrentShipment_currentLocationParent">
          <div className="centracurrentShipment_currentLocation">Date</div>
          <div className="centracurrentShipment_example_long">{date}</div>
        </div>
        <div className="centracurrentShipment_statusParent">
          <div className="centracurrentShipment_status">Status</div>
          <div className="inTransit">
            {status === 1
              ? 'Drying'
              : status === 2
              ? 'Powdering'
              : 'Shipping'}
          </div>
        </div>
      </div>
      <div className="progress-bar">
        <div className={`progress-bar-circle ${status >= 1 ? 'active' : ''}`}></div>
        <div className="progress-bar-line"></div>
        <div className={`progress-bar-circle ${status >= 2 ? 'active' : ''}`}></div>
        <div className="progress-bar-line"></div>
        <div className={`progress-bar-circle ${status >= 3 ? 'active' : ''}`}></div>
      </div>
    </section>
  );
};

export default BatchContainer;

