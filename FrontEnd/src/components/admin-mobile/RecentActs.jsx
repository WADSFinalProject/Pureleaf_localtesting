import "../../styles/admin-mobile-styles/harborhomeComp.css";

const RecentActivities = () => {
  return (
    <div className="admin_ra_recentActivitiesParent">
      <div className="recentActivies">Recent Activities</div>
      <div className="admin_ra_rectangleParent">
        <div className="admin_ra_frameChild" />
        <div className="admin_ra_frameWrapper">
          <div className="admin_ra_exampleParent">
            <div className="admin_ra_example">#XXX-XXXXXX</div>
            <div className="admin_ra_inTransitStatus">
              <div className="admin_ra_status">Status</div>
              <div className="admin_ra_inTransit">In transit</div>
            </div>
          </div>
        </div>
        <div className="admin_ra_bordersContainer" />
      </div>
    </div>
  );
};

export default RecentActivities;
