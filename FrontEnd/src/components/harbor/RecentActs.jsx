import "../../styles/harbor_styles/harborhomeComp.css";

const RecentActivities = () => {
  return (
    <div className="ra_recentActivitiesParent">
      <div className="recentActivies">Recent Activities</div>
      <div className="ra_rectangleParent">
        <div className="ra_frameChild" />
        <div className="ra_frameWrapper">
          <div className="ra_exampleParent">
            <div className="ra_example">#XXX-XXXXXX</div>
            <div className="ra_inTransitStatus">
              <div className="ra_status">Status</div>
              <div className="ra_inTransit">In transit</div>
            </div>
          </div>
        </div>
        <div className="ra_bordersContainer" />
      </div>
    </div>
  );
};

export default RecentActivities;
