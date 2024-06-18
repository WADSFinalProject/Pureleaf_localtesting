import { useEffect, useState, useContext } from "react";
import "../../styles/centra_styles/centrahome.css";
import axios from "axios";
import { FaSignOutAlt } from 'react-icons/fa'; 
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../AuthContext"; 

const CentraSearchShipment = () => {
  const [userData, setUserData] = useState({});
  const { isAuthenticated, setIsAuthenticated, setUserData: setAuthUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  async function getUserData() {    
    try {
      const userId = Cookies.get('user_id');
      const response = await axios.get(`http://localhost:8000/user/${userId}`);
      return response.data;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const initUserData = async () => {
      const newUserData = await getUserData();
      setUserData(newUserData);
      setAuthUserData(newUserData);
    }
    initUserData();
  }, [setAuthUserData]);

  const handleLogout = () => {
    // Clear authentication state
    setIsAuthenticated(false);
    setAuthUserData(null);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userData');

    // Redirect to login page
    navigate('/login');
  };
  
  return (
    <section className="centrashipmentsearch_Inner">
      {/* top part frame */}
      <div className="centrashipmentsearch_parentFrame">
        {/* profile pic, name, shipment track */}
        <div className="centrashipmentsearch_frameGroup"> 
          {/* name and profile picture */}
          <div className="centrashipmentsearch_profilepicParent">
            {/* profile picture */}
            <div className="centrashipmentsearch_frameChild" />
            {/* name and location wrapper */}
            <div className="centrashipmentsearch_frameWrapper">
              {/* name and location */}
              <div className="centrashipmentsearch_fullnameParent">
                <h3 className="centrashipmentsearch_fullName">{userData?.username}</h3>
                <div className="centrashipmentsearch_location">{userData?.centra_name}</div>
              </div>
            </div>
          </div>
          {/* shipment tracking search */}
          <div className="centrashipmentsearch_frameContainer">
            <div className="centrashipmentsearch_trackingShipmentParent">
              <div className="centrashipmentsearch_trackingShipment">
                Track your shipment
              </div>
              <input
                className="centrashipmentsearch_frameItem"
                placeholder="Resi number"
                type="text"
              />
            </div>
          </div>
        </div>
        {/* stuff to the side */}
        <div className="centrashipmentsearch_rectangleParent">
          <div className="centrashipmentsearch_frameInner" onClick={handleLogout}>
            <FaSignOutAlt size={24} color="black" /> 
          </div>
          <div className="centrashipmentsearch_rectangleDiv" />
        </div>
      </div>
    </section>
  );
};

export default CentraSearchShipment;
