import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import privateCar from '../../images/privateCar.png';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const Vehicle=()=>{
        let newVehicle={...loggedInUser,vehicleName:'Car',vehicle:privateCar}
        setLoggedInUser(newVehicle)
    }
    return (
        <div className="header container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="header-title ">
                    <h1>Go With Us</h1>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <ul className="header-nav">
                        <Link to='/home'><li>Home</li></Link>
                        <Link to='/destination' onClick={Vehicle}><li>Destination</li></Link>
                        <Link to='/blog'><li>Blog</li></Link>
                        <Link to='/contact'><li>Contact</li></Link>
                        <li>{loggedInUser.email ? loggedInUser.name : <Link to='/login'>Login</Link>}</li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;