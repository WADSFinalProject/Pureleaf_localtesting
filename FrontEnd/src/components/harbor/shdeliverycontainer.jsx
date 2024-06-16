import "../../styles/harbor_styles/shippinghistory.css"
import { Link } from "react-router-dom"

const Shiphistorycontainer = ({Batch_ID}) => {
  return (
    <section className="s_contain_rectangleParent">
      <div className="s_contain_frameChild" />
      <div className="s_contain_batchIdParent">
        <b className="s_contain_batchId">Batch ID: {Batch_ID}</b>
        <div className="s_contain_quickRelevantInfo">Quick relevant info</div>
      </div>
      <div className="s_contain_frameWrapper">
        <div className="s_contain_frameParent">
          <div className="s_contain_frameContainer">
            <div className="s_contain_ellipseParent">
              <div className="s_contain_frameItem" />
              <div className="s_contain_lineWrapper">
                <div className="s_contain_frameInner" />
              </div>
              <div className="s_contain_ellipseDiv" />
            </div>
          </div>
          <i className="s_contain_finishOnDate">{`Finish on: <Date>`}</i>
        </div>
      </div>
      <div className="s_contain_infoDot" />
    </section>
  );
};

export default Shiphistorycontainer;

