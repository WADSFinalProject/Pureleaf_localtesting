import "../../styles/centra_styles/newbatch.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

const MCentraNewBatchDetails = () => {

    const navigate = useNavigate();

    const handleNextClick = () => {
      navigate('/newbatch6');
    };
  
    const handleBackClick = () => {
      navigate('/newbatch4');
    };

  return (
    <div className="NBD_mcentra-new-batch-details">
      <div className="NBD_new-batch1">New Batch</div>
      <Link to="/ongoingshipments" className="NBD_cancel1">Cancel</Link>
      <div className="NBD_mcentra-new-batch-details-child" />
      <div className="NBD_powder-details">Powder details:</div>
      <div className="NBD_weight1">Weight</div>
      <div className="NBD_date1">Date</div>
      <div className="NBD_shipping-details">Shipping details:</div>
      <div className="NBD_shipping-id">Shipping ID</div>
      <div className="NBD_date2">Date</div>
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
