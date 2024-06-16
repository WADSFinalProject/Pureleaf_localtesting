import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import "../../styles/centra_styles/newbatch.css";

const MCentraAddWet = () => {

  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/newbatch3');
  };

  const handleBackClick = () => {
    navigate('/newbatch1');
  };

  return (
    <div className="NBAW_mcentra-add-wet">
      <div className="NBAW_new-batch">New Batch</div>
      <Link to="/ongoingshipments" className="NBAW_cancel">Cancel</Link>
      <div className="NBAW_mcentra-add-wet-child" />
      <div className="NBAW_wet-leaves">Wet leaves:</div>
      <div className="NBAW_weight">Weight</div>
      <div className="NBAW_date">Date</div>
      <div className="NBAW_mcentra-add-wet-item" />
      <div className="NBAW_mcentra-add-wet-inner" />
      <div className="NBAW_next" onClick={handleNextClick}>Next</div>
      <div className="NBAW_back" onClick={handleBackClick}>Back</div>
      <div className="NBAW_ellipse-div" />
      <div className="NBAW_mcentra-add-wet-child1" />
      <div className="NBAW_line-div" />
      <div className="NBAW_mcentra-add-wet-child2" />
      <div className="NBAW_mcentra-add-wet-child3" />
      <div className="NBAW_rectangle-div" />
      </div>
  );
};

export default MCentraAddWet;
