import "../../styles/centra_styles/newbatch.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { API } from "./centraAPI";
import axios from "axios";
import { useState } from "react";

const MCentraAddDry = () => {
  console.log("dry leaves visited")

    const navigate = useNavigate();
    const { batchID } = useParams();

    const handleNextClick = async () => {
      const api = API()
      const dryInfo = {
        "dry_leaves_ID": 0,
        "dry_weight": weight ? weight : 0,
        "dry_date": date ? date : "2024-06-18T05:04:16.197Z",
        "dry_image": "string"
      }
      const response2 = await axios.post(api + '/set_dry_leaves_information', dryInfo)
      const dryId = response2.data.dry_leaves_ID;
      axios.put(api + `/update_dry_leaves_data/${batchID}?dry_id=${dryId}`)
      axios.put(api + `/update_order_status/${batchID}`, {status: 2})
      navigate(`/newbatch4/${batchID}`);
    };
  
    const handleBackClick = () => {
      navigate('/');
    };
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState();

  return (
    <div className="NBAD_mcentra-add-dry">
      <div className="NBAD_new-batch3">{`Batch #${batchID}`}</div>
      <Link to="/ongoingshipments" className="NBAD_cancel3">Cancel</Link>
      <div className="NBAD_mcentra-add-dry-child" />
      <div className="NBAD_dry-leaves">Dry leaves:</div>
      <div className="NBAD_weight3">{"Weight   "}
        <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
            />
      </div>
      <div className="NBAD_date4">{"Date   "}
        <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
      </div>
      <div className="NBAD_mcentra-add-dry-item" />
      <div className="NBAD_mcentra-add-dry-inner" />
      <div className="NBAD_next2" onClick={handleNextClick}>Next</div>
      <div className="NBAD_back3" onClick={handleBackClick}>Back</div>
      <div className="NBAD_mcentra-add-dry-child1" />
      <div className="NBAD_mcentra-add-dry-child2" />
      <div className="NBAW_line-div" />
      <div className="NBAD_mcentra-add-dry-child3" />
      <div className="NBAD_mcentra-add-dry-child4" />
      <div className="NBAD_mcentra-add-dry-child5" />
      <div className="NBAD_mcentra-add-dry-child6" />
    </div>
  );
};

export default MCentraAddDry;
