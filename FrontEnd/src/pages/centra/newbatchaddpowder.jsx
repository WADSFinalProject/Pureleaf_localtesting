import "../../styles/centra_styles/newbatch.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { API } from "./centraAPI";
import axios from "axios";
import { useState } from "react";

const MCentraAddPowdered = () => {

    const navigate = useNavigate();
    const { batchID } = useParams();
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState();

    const handleNextClick = async() => {
      const api = API()
  
      const powderInfo = {
        "powdered_leaves_ID": 0,
        "powdered_weight": weight ? weight : 0,
        "powdered_date": date ? date : "2024-06-18T05:04:16.197Z",
        "powdered_image": "string"
      }
      const response2 = await axios.post(api + '/set_powdered_leaves_information', powderInfo)
      const powderedId = response2.data.powdered_leaves_ID;
      axios.put(api + `/update_powdered_leaves_data/${batchID}?powder_id=${powderedId}`)
      axios.put(api + `/update_order_status/${batchID}`, {status: 3})
      navigate(`/newbatch5/${batchID}`);
    };
  
    const handleBackClick = () => {
      navigate('/');
    };

  

  return (
    <div className="NBAP_mcentra-add-powdered">
      <div className="NBAP_new-batch2">{`Batch #${batchID}`}</div>
      <Link to="/ongoingshipments" className="NBAP_cancel2">Cancel</Link>
      <div className="NBAP_mcentra-add-powdered-child" />
      <div className="NBAP_powdered-leaves">Powdered leaves:</div>
      <div className="NBAP_weight2">{"Weight   "}
        <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
            />
      </div>
      <div className="NBAP_date3">{"Date   "}
        <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
      </div>
      <div className="NBAP_mcentra-add-powdered-item" />
      <div className="NBAP_mcentra-add-powdered-inner" />
      <div className="NBAP_next1" onClick={handleNextClick}>Next</div>
      <div className="NBAP_back2" onClick={handleBackClick}>Back</div>
      <div className="NBAP_mcentra-add-powdered-child1" />
      <div className="NBAW_line-div" />
      <div className="NBAP_mcentra-add-powdered-child2" />
      <div className="NBAP_mcentra-add-powdered-child3" />
      <div className="NBAP_mcentra-add-powdered-child4" />
      <div className="NBAP_mcentra-add-powdered-child5" />
      <div className="NBAP_mcentra-add-powdered-child6" />
    </div>
  );
};

export default MCentraAddPowdered;
