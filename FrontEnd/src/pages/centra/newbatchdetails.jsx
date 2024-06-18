import { useEffect, useState } from "react";
import "../../styles/centra_styles/newbatch.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { API } from "./centraAPI";
import axios from "axios";

const MCentraNewBatchDetails = () => {

    const navigate = useNavigate();
    const [batchData, setBatchData] = useState();
    const [harborID, setHarborID] = useState();
    const [date, setDate] = useState();
    const { batchID } = useParams();
    const api = API()

    useEffect(() => {
      const setBatch = async () => {
        const response = await axios.get(api + '/get_order/' + batchID);
        const result = response.data;
        setBatchData(result);
      }
      setBatch();
    }, [])

    const handleNextClick = async() => {
      try {
        const postData = {
          sent_date: date,
          batch_ID: batchID,
          harbor_ID: harborID,
          transport_status: 0,
          harbor_batch_rescale: 0,
          arrival_date: "2024-06-18T09:10:43.019Z",
          hg_user_ID: 0,
        };
        await axios.post(api + '/create_harbor_checkpoint', postData);
        axios.put(api + `/update_order_status/${batchID}`, {status: 4})
        navigate('/newbatch6');
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
  
    const handleBackClick = () => {
      navigate('/');
    };
    if (!batchData) {
      return <div>Loading...</div>;
    }
  return (
    <div className="NBD_mcentra-new-batch-details">
      <div className="NBD_new-batch1">{`Batch #${batchID}`}</div>
      <Link to="/ongoingshipments" className="NBD_cancel1">Cancel</Link>
      <div className="NBD_mcentra-new-batch-details-child" />
      <div className="NBD_powder-details">Powder details:</div>
      <div className="NBD_weight1">{`Weight ${batchData.powdered_leaves.powdered_weight}`}</div>
      <div className="NBD_date1">{`Weight ${batchData.powdered_leaves.powdered_date}`}</div>
      <div className="NBD_shipping-details">Shipping details:</div>
      <div className="NBD_shipping-id">{"Harbor ID   "}
        <input 
              type="number" 
              value={harborID} 
              onChange={(e) => setHarborID(e.target.value)} 
            />
      </div>
      <div className="NBD_date2">{"Date   "}
        <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
      </div>
      <div className="NBD_mcentra-new-batch-details-item" />
      <div className="NBD_mcentra-new-batch-details-inner" />
      <div className="NBD_ship" onClick={handleNextClick}>Ship</div>
      <div className="NBD_back1" onClick={handleBackClick}>Back</div>
      <div className="NBD_mcentra-new-batch-details-child1" />
      <div className="NBAW_line-div" />
      <div className="NBD_mcentra-new-batch-details-child2" />
      <div className="NBD_mcentra-new-batch-details-child3" />
      <div className="NBD_mcentra-new-batch-details-child4" />
      <div className="NBD_mcentra-new-batch-details-child5" />
      <div className="NBD_mcentra-new-batch-details-child6" />
    </div>
  );
};

export default MCentraNewBatchDetails;
