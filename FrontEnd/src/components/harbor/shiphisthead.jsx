import "../../styles/harbor_styles/shippinghistory.css"

const ShippingHistoryHeader = () => {
  return (
    <section className="s_head_filterBy">
      <div className="s_head_filterBy1">Filter by:</div>
      <div className="s_head_batches">
        <div className="s_head_batchesChild" />
        <div className="s_head_batchIdParent">
          <b className="s_head_batchId">Batch ID</b>
          <div className="s_head_quickRelevantInfo">Quick relevant info</div>
        </div>
        <div className="s_head_quickInfoLabel">
          <div className="s_head_quickInfoLabel1">
            <div className="s_head_quickInfoLabelInner">
              <div className="s_head_ellipseParent">
                <div className="s_head_frameChild" />
                <div className="s_head_lineWrapper">
                  <div className="s_head_frameItem" />
                </div>
                <div className="s_head_frameInner" />
              </div>
            </div>
            <i className="s_head_finishOnDate">{`Finish on: <Date>`}</i>
          </div>
        </div>
        <div className="s_head_shape" />
      </div>
    </section>
  );
};

export default ShippingHistoryHeader;
