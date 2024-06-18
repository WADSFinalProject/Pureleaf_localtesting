import BatchContainer from "../../components/centra/batch_container.jsx";
import "../../styles/centra_styles/batchcontainer.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./centraAPI.jsx";
import axios from "axios";
import Cookies from 'js-cookie';

const BatchHistory = () => {
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
    <div className="shiphist_mharborShippingHistory">
      <section className="shiphist_frameParent">
        <div className="shiphist_parent">
          <Link to="/" className="shiphist_backButton">{`<-`}</Link>
          <h3 className="shiphist_shippingHistory">Batch History</h3>
        </div>
        <input className="shiphist_frameChild" placeholder="Search" type="text" />
        Filter By
        {batches.map((item,index) => (<BatchContainer key={item.batch_ID} 
        Batch_ID={item.batch_ID}
        date={item.batch_date}
        status={item.status}/>))}
      </section>
    </div>
  );
};

export default BatchHistory;
