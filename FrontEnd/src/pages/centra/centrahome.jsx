import "../../styles/centra_styles/centrahome.css";
import React, { useState, useEffect } from "react";  
import CentraRecentActivities from "../../components/centra/cen_recentacts";
import CentraCurrentShipping from "../../components/centra/cen_currentshipment";
import CentraSearchShipment from "../../components/centra/cen_searchshipment";
import { Link } from "react-router-dom";
import { API } from "./centraAPI.jsx";
import axios from "axios";
import Cookies from 'js-cookie';


const Centrahome = () => {
    async function getUserData() {    
        try{
            const userId = Cookies.get('user_id');
            const response = await axios.get(`http://localhost:8000/user/${userId}`);
            const result = response.data
            return result;
        } catch {
            return 0;
        }
    }
    
    const [batches, setBatches] = useState([]);

    const api = API();
    
    useEffect(() => {
        const updateBatches = async () => {
            try {
                const userData = await getUserData()
                const centraID = userData.centra_ID;
                const response = await axios.get(api + '/get_all_orders/' + centraID);
                setBatches(response.data);
            } catch (error) {
                console.error('Error fetching batches:', error);
            }
        }
        updateBatches()
    }, [])
    return (
        <div className="centraHome_mainHome">
            <CentraSearchShipment />
            <section className="centraHome_InnerSection">
                <div className="centraHome_frameParent">
                    {batches.length > 0 ? 
                    <CentraCurrentShipping
                        batchID={batches[0].batch_ID}
                        date={batches[0].batch_date}
                        status={batches[0].status} /> 
                    : "No Batches"}
                    
                    <div className="centraHome_featuresParent">
                        <div className="centraHome_features">Features</div>
                        <div className="centraHome_rectangleParent2">
                            <Link to ="/newbatch1" className="centraHome_box1">Add New Batch</Link>
                            <Link to ="/ongoingbatch" className="centraHome_box2">Ongoing Batch</Link>
                            <Link to ="/batchhist" className="centraHome_box3">Batch History</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
  };
  
  export default Centrahome;