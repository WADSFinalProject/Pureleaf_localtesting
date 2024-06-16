import "../../styles/centra_styles/centrahome.css";

const CentraRecentActivities = () => {
  return (
    <div className="centraRA_recentActivitiesParent">
      <div className="centraRA_recentActivies">Recent Activities</div>
      <div className="centraRA_rectangleParent">
        <div className="centraRA_frameChild" />
        <div className="centraRA_frameWrapper">
          <div className="centraRA_exampleParent">
            <div className="centraRA_example">#XXX-XXXXXX</div>
            <div className="centraRA_inTransitStatus">
              <div className="centraRA_status">Status</div>
              <div className="centraRA_inTransit">In transit</div>
            </div>
          </div>
        </div>
        <div className="centraRA_bordersContainer" />
      </div>
    </div>
  );
};

export default CentraRecentActivities;
