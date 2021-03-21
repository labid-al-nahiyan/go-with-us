import React, { useContext } from 'react';
import Header from '../Header/Header';
import './Home.css';
import motorCycle from '../../images/motorcycle.png';
import privateCar from '../../images/privateCar.png';
import bus from '../../images/bus.png';
import metroRail from '../../images/metroRail.png';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../App';


const Home = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const setVehicle=(vehicleName,vehicle)=>{
        let newVehicle={...loggedInUser,vehicleName:vehicleName||'Car',vehicle:vehicle||privateCar}
        setLoggedInUser(newVehicle)
    }
    return (
        <div className="home container-fluid">
            <div className="select-vehicle row">
                <div className="col-12 col-lg-3">
                    <div className="vehicle">
                        <Link to="/destination" onClick={()=>setVehicle('motorCycle',motorCycle)}><img src={motorCycle} alt="" /></Link>
                        <p style={{paddingTop:'5px'}}>Motre Cycle</p>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div className="vehicle">
                        <Link to="/destination" onClick={()=>setVehicle('privateCar',privateCar)}><img src={privateCar} alt="" /></Link>
                        <p style={{paddingTop:'5px'}}>Private Car</p>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div className="vehicle">
                        <Link to="/destination" onClick={()=>setVehicle('bus',bus)}><img src={bus} alt="" /></Link>
                        <p style={{paddingTop:'5px'}}>Bus</p>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div className="vehicle">
                        <Link to="/destination" onClick={()=>setVehicle('metroRail',metroRail)}><img src={metroRail} alt="" /></Link>
                        <p style={{paddingTop:'5px'}}> METRORAIL </p>
                </div>
                </div>
            </div>
        </div>

    );
};

export default Home;