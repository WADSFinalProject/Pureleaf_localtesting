import "../../styles/centra_styles/centrahome.css";
import React from "react";  
import CentraRecentActivities from "../../components/centra/cen_recentacts";
import CentraCurrentShipping from "../../components/centra/cen_currentshipment";
import CentraSearchShipment from "../../components/centra/cen_searchshipment";
import { Link } from "react-router-dom";


const Centrahome = () => {
    return (
        <div className="centraHome_mainHome">
            <CentraSearchShipment />
            <section className="centraHome_InnerSection">
                <div className="centraHome_frameParent">
                    <CentraCurrentShipping />
                    <div className="centraHome_featuresParent">
                        <div className="centraHome_features">Features</div>
                        <div className="centraHome_rectangleParent2">
                            {/* <Link to="/ongoingshipments" className="box1"></Link>
                            <Link to="/shippinghistory" className="box2"></Link> */}
                            <Link to ="/newbatch1" className="centraHome_box1">Add New Batch</Link>
                            {/*<div className="centraHome_box1">Add New Batch</div>*/}
                            {/* <div className="centraHome_box2">Ongoing Batch</div> */}
                            <Link to ="/ongoingbatch" className="centraHome_box2">Ongoing Batch</Link>
                            {/* <div className="centraHome_box3">Batch History</div> */}
                            <Link to ="/batchhist" className="centraHome_box3">Batch History</Link>
                        </div>
                    </div>
                    <CentraRecentActivities />
                </div>
            </section>
            <footer className="centraHome_mobileHarbourHomeChild" />
        </div>
    )
  };
  
  export default Centrahome;