import "../../styles/centra_styles/newbatch.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

const MCentraAddDry = () => {

    const navigate = useNavigate();

    const handleNextClick = () => {
      navigate('/newbatch4');
    };
  
    const handleBackClick = () => {
      navigate('/newbatch2');
    };

  return (
    <div className="NBAD_mcentra-add-dry">
      <div className="NBAD_new-batch3">New Batch</div>
      <Link to="/ongoingshipments" className="NBAD_cancel3">Cancel</Link>
      <div className="NBAD_mcentra-add-dry-child" />
      <div className="NBAD_dry-leaves">Dry leaves:</div>
      <div className="NBAD_weight3">Weight</div>
      <div className="NBAD_date4">Date</div>
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
