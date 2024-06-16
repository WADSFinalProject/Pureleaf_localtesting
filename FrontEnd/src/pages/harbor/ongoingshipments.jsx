import "../../styles/harbor_styles/ongoingshipments.css";
import OngoingShipmentHeader from "../../components/harbor/osh";
import OSdeliverycontainer from "../../components/harbor/osdeliverycontainer";
import { useEffect, useState } from "react";

const Ongoingshipments = () => {
    const data = [{data_id: 21021380132}]
    const [harborpageinfo, setharborpageinfo] = useState(0);
    const handlepageclick = (newpage) => {setharborpageinfo(newpage)};
    const currentharborinfo = data.slice(harborpageinfo);
    return(
    <div className="mainOngoingShipment">
        <OngoingShipmentHeader />
        {currentharborinfo.map((item,index) => (<OSdeliverycontainer key={item.data_id} ID_Data={item.data_id}/>))}
    </div>
    )
};

export default Ongoingshipments 