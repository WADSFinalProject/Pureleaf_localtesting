import Shiphistorycontainer from "../../components/harbor/shdeliverycontainer.jsx";
/* import ShippingHistoryBody from "../components/ShippingHistoryBody"; */
import "../../styles/harbor_styles/shippinghistory.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ShippingHistory = () => {
    const batch = [{batch_id: 21021380132}, {batch_id: 2999830913}, {batch_id: 23123131231}, {batch_id: 5235235235}]
    const [shiphistpageinfo, setshiphistpageinfo] = useState(0);
    const handlepageclick = (newpage) => {setshiphistpageinfo(newpage)};
    const currentshiphistinfo = batch.slice(shiphistpageinfo);
  return (
    <div className="shiphist_mharborShippingHistory">
      <section className="shiphist_frameParent">
        <div className="shiphist_parent">
          <Link to="/" className="shiphist_backButton">{`<-`}</Link>
          <h3 className="shiphist_shippingHistory">Shipping history</h3>
        </div>
        <input className="shiphist_frameChild" placeholder="Search" type="text" />
        Filter By
        {currentshiphistinfo.map((item,index) => (<Shiphistorycontainer key={item.batch_id} Batch_ID={item.batch_id}/>))}
      </section>
    </div>
  );
};

export default ShippingHistory;
