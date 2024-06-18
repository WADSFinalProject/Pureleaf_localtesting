import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/centra_styles/newbatch.css";
import { useState } from "react";
import axios from "axios";
import { API } from "./centraAPI";

const MCentraAddWet = () => {
  const navigate = useNavigate();
  const api = API();

  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

  const handleNextClick = async () => {
    try {
      const batchInfo = {
        batch_ID: 0,
        batch_date: date || "2024-06-18T05:04:16.197Z",
        dry_leaves_ID: 0,
        wet_leaves_ID: 0,
        powdered_leaves_ID: 0,
        status: 1,
        dry_leaves: {
          dry_leaves_ID: 0,
          dry_weight: 0,
          dry_date: "2024-06-18T05:04:16.197Z",
          dry_image: "string"
        },
        wet_leaves: {
          wet_leaves_ID: 0,
          wet_weight: 0,
          wet_date: date || "2024-06-18T05:04:16.197Z",
          wet_image: "string"
        },
        powdered_leaves: {
          powdered_leaves_ID: 0,
          powdered_weight: 0,
          powdered_date: "2024-06-18T05:04:16.197Z",
          powdered_image: "string"
        }
      };

      const response = await axios.post(api + '/set_batch_information', batchInfo);
      const batchId = response.data.batch_ID;

      const wetInfo = {
        wet_leaves_ID: 0,
        wet_weight: weight || 0,
        wet_date: date || "2024-06-18T05:04:16.197Z",
        wet_image: "string"
      };

      const response2 = await axios.post(api + '/set_wet_leaves_information', wetInfo);
      const wetId = response2.data.wet_leaves_ID;

      await axios.put(api + `/update_wet_leaves_data/${batchId}?wet_id=${wetId}`);
      
    } catch (error) {
      console.error("Error updating batch information:", error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="NBAW_mcentra-add-wet">
      <div className="NBAW_new-batch">New Batch</div>
      <Link to="/ongoingshipments" className="NBAW_cancel">Cancel</Link>
      <div className="NBAW_mcentra-add-wet-child" />
      <div className="NBAW_wet-leaves">Wet leaves:</div>
      <div className="NBAW_weight">{"Weight   "}
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
        />
      </div>
      <div className="NBAW_date">{"Date   "}
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div className="NBAW_mcentra-add-wet-inner" />
      <div className="NBAW_mcentra-add-wet-item" />
      <div className="NBAW_next" onClick={handleNextClick}>Next</div>
      <div className="NBAW_back" onClick={handleBackClick}>Back</div>
      <div className="NBAW_ellipse-div" />
      <div className="NBAW_mcentra-add-wet-child1" />
      <div className="NBAW_line-div" />
      <div className="NBAW_rectangle-div" />
      <div className="NBAW_mcentra-add-wet-child2" />
      <div className="NBAW_mcentra-add-wet-child3" />
      <div className="NBA_mcentra_bottom_spacer"></div>
    </div>
  );
};

export default MCentraAddWet;
