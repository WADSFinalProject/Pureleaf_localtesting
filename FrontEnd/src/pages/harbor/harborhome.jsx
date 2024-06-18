import "../../styles/harbor_styles/harborhome.css";
import React from "react";  
import SearchShipment from "../../components/harbor/SearchShipment";
import CurrentShipping from "../../components/harbor/CurrentShipment";
import RecentActivities from "../../components/harbor/RecentActs";
import { Link } from "react-router-dom";

const Harborhome = () => {
    return (
        <div className="harborhome_mainHome">
            <SearchShipment />
            <section className="harborhome_InnerSection">
                <div className="harborhome_frameParent">
                    <RecentActivities />
                    <div className="harborhome_featuresParent">
                        <div className="harborhome_features" style={{ fontWeight: 'bold' }}>Features</div>
                        <div className="harborhome_rectangleParent2">
                            <Link to="/ongoingshipments" className="harborhome_box1">Ongoing Shipments</Link>
                            <Link to="/shippinghistory" className="harborhome_box2">Shipping History</Link>
                        </div>
                    </div>
                    <CurrentShipping />
                </div>
            </section>
            <footer className="harborhome_mobileHarbourHomeChild" />
        </div>
    )
  };
  
  export default Harborhome;