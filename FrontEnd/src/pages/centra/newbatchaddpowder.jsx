import "../../styles/centra_styles/newbatch.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

const MCentraAddPowdered = () => {

    const navigate = useNavigate();

    const handleNextClick = () => {
      navigate('/newbatch5');
    };
  
    const handleBackClick = () => {
      navigate('/newbatch3');
    };

  return (
    <div className="NBAP_mcentra-add-powdered">
      <div className="NBAP_new-batch2">New Batch</div>
      <Link to="/ongoingshipments" className="NBAP_cancel2">Cancel</Link>
      <div className="NBAP_mcentra-add-powdered-child" />
      <div className="NBAP_powdered-leaves">Powdered leaves:</div>
      <div className="NBAP_weight2">Weight</div>
      <div className="NBAP_date3">Date</div>
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
